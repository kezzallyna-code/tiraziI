-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Create Profiles Table
create table if not exists profiles (
    id uuid references auth.users(id) on delete cascade primary key,
    username text unique,
    full_name text,
    avatar_url text,
    cover_url text,
    bio text,
    wilaya text,
    experience_level text check (experience_level in ('emerging', 'experienced', 'professional', 'master')),
    subscription_plan text default 'free' check (subscription_plan in ('free', 'premium_basic', 'premium_pro')),
    is_verified boolean default false,
    account_status text default 'active' check (account_status in ('active', 'suspended', 'banned')),
    is_admin boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles for select using (true);
create policy "Users can update own profile." on profiles for update using (auth.uid() = id);

-- Trigger to create minimal profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name, subscription_plan, account_status, is_verified, is_admin)
  values (new.id, new.raw_user_meta_data->>'full_name', 'free', 'active', false, false);
  return new;
end;
$$ language plpgsql security definer;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- 2. Roles
create table if not exists roles (
    id uuid primary key default uuid_generate_v4(),
    name text unique not null,
    slug text unique not null
);

alter table roles enable row level security;
create policy "Roles are viewable by everyone." on roles for select using (true);

-- Initial roles
insert into roles (name, slug) values
('Fashion Designer', 'fashion-designer'),
('Styliste', 'styliste'),
('Modéliste', 'modeliste'),
('Tailor/Couturier', 'tailor-couturier'),
('Atelier de Confection', 'atelier-confection'),
('Crochet Artisan', 'crochet-artisan'),
('Embroidery Artisan', 'embroidery-artisan'),
('Leather Artisan', 'leather-artisan'),
('Clothing Repair Specialist', 'clothing-repair-specialist'),
('Traditional Clothing Specialist', 'traditional-clothing-specialist')
on conflict (slug) do nothing;

-- 3. Profile Roles
create table if not exists profile_roles (
    profile_id uuid references profiles(id) on delete cascade,
    role_id uuid references roles(id) on delete cascade,
    primary key (profile_id, role_id)
);

alter table profile_roles enable row level security;
create policy "Profile roles are viewable by everyone." on profile_roles for select using (true);
create policy "Users can insert their own roles." on profile_roles for insert with check (auth.uid() = profile_id);
create policy "Users can delete their own roles." on profile_roles for delete using (auth.uid() = profile_id);

-- 4. Categories
create table if not exists categories (
    id uuid primary key default uuid_generate_v4(),
    name text unique not null,
    slug text unique not null,
    description text,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table categories enable row level security;
create policy "Categories are viewable by everyone." on categories for select using (true);

insert into categories (name, slug) values
('Traditional Karakou', 'traditional-karakou'),
('Haute Couture', 'haute-couture'),
('Hand Embroidery', 'hand-embroidery'),
('Silk Weaving', 'silk-weaving'),
('Bridal Couture', 'bridal-couture'),
('Jewelry Accessories', 'jewelry-accessories'),
('Leather Craft', 'leather-craft'),
('Traditional Weaving', 'traditional-weaving')
on conflict (slug) do nothing;

-- 5. Posts
create table if not exists posts (
    id uuid primary key default uuid_generate_v4(),
    author_id uuid references profiles(id) on delete cascade not null,
    content text not null,
    post_type text check (post_type in ('thought', 'question', 'tip', 'showcase', 'industry-update')),
    media_url text,
    media_type text check (media_type in ('image', 'video')),
    category_id uuid references categories(id) on delete set null,
    wilaya text,
    status text default 'approved' check (status in ('pending', 'approved', 'rejected', 'hidden', 'removed')),
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table posts enable row level security;
create policy "Approved posts are viewable by everyone." on posts for select using (status = 'approved' or auth.uid() = author_id);
create policy "Users can insert their own posts." on posts for insert with check (auth.uid() = author_id);
create policy "Users can update their own posts." on posts for update using (auth.uid() = author_id);
create policy "Users can delete their own posts." on posts for delete using (auth.uid() = author_id);

-- 6. Post Likes
create table if not exists post_likes (
    post_id uuid references posts(id) on delete cascade,
    profile_id uuid references profiles(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    primary key (post_id, profile_id)
);

alter table post_likes enable row level security;
create policy "Post likes are viewable by everyone." on post_likes for select using (true);
create policy "Users can toggle their own post likes." on post_likes for all using (auth.uid() = profile_id);

-- 7. Post Comments
create table if not exists post_comments (
    id uuid primary key default uuid_generate_v4(),
    post_id uuid references posts(id) on delete cascade not null,
    author_id uuid references profiles(id) on delete cascade not null,
    content text not null,
    status text default 'approved' check (status in ('pending', 'approved', 'rejected', 'hidden', 'removed')),
    created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table post_comments enable row level security;
create policy "Approved post comments are viewable by everyone." on post_comments for select using (status = 'approved' or auth.uid() = author_id);
create policy "Users can insert their own post comments." on post_comments for insert with check (auth.uid() = author_id);
create policy "Users can update their own post comments." on post_comments for update using (auth.uid() = author_id);
create policy "Users can delete their own post comments." on post_comments for delete using (auth.uid() = author_id);

-- 8. Saved Posts
create table if not exists saved_posts (
    post_id uuid references posts(id) on delete cascade,
    profile_id uuid references profiles(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    primary key (post_id, profile_id)
);

alter table saved_posts enable row level security;
create policy "Users can see their own saved posts." on saved_posts for select using (auth.uid() = profile_id);
create policy "Users can manage their own saved posts." on saved_posts for all using (auth.uid() = profile_id);

-- 9. Follows
create table if not exists follows (
    follower_id uuid references profiles(id) on delete cascade,
    following_id uuid references profiles(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    primary key (follower_id, following_id),
    constraint no_self_follow check (follower_id != following_id)
);

alter table follows enable row level security;
create policy "Follows are viewable by everyone." on follows for select using (true);
create policy "Users can manage their own follows." on follows for all using (auth.uid() = follower_id);

-- 10. Projects
create table if not exists projects (
    id uuid primary key default uuid_generate_v4(),
    author_id uuid references profiles(id) on delete cascade not null,
    title text not null,
    description text not null,
    category_id uuid references categories(id) on delete set null,
    wilaya text,
    status text default 'approved' check (status in ('pending', 'approved', 'rejected', 'hidden', 'removed')),
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

alter table projects enable row level security;
create policy "Approved projects are viewable by everyone." on projects for select using (status = 'approved' or auth.uid() = author_id);
create policy "Users can insert their own projects." on projects for insert with check (auth.uid() = author_id);
create policy "Users can update their own projects." on projects for update using (auth.uid() = author_id);
create policy "Users can delete their own projects." on projects for delete using (auth.uid() = author_id);

-- 11. Project Media
create table if not exists project_media (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references projects(id) on delete cascade not null,
    media_url text not null,
    media_type text check (media_type in ('image', 'video')),
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table project_media enable row level security;
create policy "Project media viewable by everyone." on project_media for select using (true);
create policy "Project author can manage project media." on project_media for all using (
    auth.uid() in (select author_id from projects where id = project_media.project_id)
);

-- 12. Project Collaborators
create table if not exists project_collaborators (
    project_id uuid references projects(id) on delete cascade,
    profile_id uuid references profiles(id) on delete cascade,
    primary key (project_id, profile_id)
);

alter table project_collaborators enable row level security;
create policy "Project collaborators viewable by everyone." on project_collaborators for select using (true);
create policy "Project author can manage project collaborators." on project_collaborators for all using (
    auth.uid() in (select author_id from projects where id = project_collaborators.project_id)
);

-- 13. Project Likes
create table if not exists project_likes (
    project_id uuid references projects(id) on delete cascade,
    profile_id uuid references profiles(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    primary key (project_id, profile_id)
);

alter table project_likes enable row level security;
create policy "Project likes are viewable by everyone." on project_likes for select using (true);
create policy "Users can toggle their own project likes." on project_likes for all using (auth.uid() = profile_id);

-- 14. Project Comments
create table if not exists project_comments (
    id uuid primary key default uuid_generate_v4(),
    project_id uuid references projects(id) on delete cascade not null,
    author_id uuid references profiles(id) on delete cascade not null,
    content text not null,
    status text default 'approved' check (status in ('pending', 'approved', 'rejected', 'hidden', 'removed')),
    created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table project_comments enable row level security;
create policy "Approved project comments are viewable by everyone." on project_comments for select using (status = 'approved' or auth.uid() = author_id);
create policy "Users can insert their own project comments." on project_comments for insert with check (auth.uid() = author_id);
create policy "Users can update their own project comments." on project_comments for update using (auth.uid() = author_id);
create policy "Users can delete their own project comments." on project_comments for delete using (auth.uid() = author_id);

-- 15. Saved Projects
create table if not exists saved_projects (
    project_id uuid references projects(id) on delete cascade,
    profile_id uuid references profiles(id) on delete cascade,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    primary key (project_id, profile_id)
);

alter table saved_projects enable row level security;
create policy "Users can see their own saved projects." on saved_projects for select using (auth.uid() = profile_id);
create policy "Users can manage their own saved projects." on saved_projects for all using (auth.uid() = profile_id);

-- 16. Conversations
create table if not exists conversations (
    id uuid primary key default uuid_generate_v4(),
    created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table conversations enable row level security;
create policy "Users can view their own conversations." on conversations for select using (
    auth.uid() in (select profile_id from conversation_members where conversation_id = conversations.id)
);
create policy "Users can create conversations." on conversations for insert with check (true);

-- 17. Conversation Members
create table if not exists conversation_members (
    conversation_id uuid references conversations(id) on delete cascade,
    profile_id uuid references profiles(id) on delete cascade,
    primary key (conversation_id, profile_id)
);

-- Trigger/Function to enforce max 2 members for MVP
create or replace function enforce_max_conversation_members()
returns trigger as $$
declare
    member_count integer;
begin
    select count(*) into member_count from conversation_members where conversation_id = new.conversation_id;
    if member_count >= 2 then
        raise exception 'MVP limitation: Conversations can only have two members.';
    end if;
    return new;
end;
$$ language plpgsql;

drop trigger if exists check_max_conversation_members on conversation_members;
create trigger check_max_conversation_members
before insert on conversation_members
for each row execute procedure enforce_max_conversation_members();

alter table conversation_members enable row level security;
create policy "Users can view members of their own conversations." on conversation_members for select using (
    auth.uid() in (select profile_id from conversation_members where conversation_id = conversation_members.conversation_id)
);
create policy "Users can add themselves to conversations." on conversation_members for insert with check (auth.uid() = profile_id);

-- 18. Messages
create table if not exists messages (
    id uuid primary key default uuid_generate_v4(),
    conversation_id uuid references conversations(id) on delete cascade not null,
    sender_id uuid references profiles(id) on delete cascade not null,
    content text not null,
    is_read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table messages enable row level security;
create policy "Users can view messages in their conversations." on messages for select using (
    auth.uid() in (select profile_id from conversation_members where conversation_id = messages.conversation_id)
);
create policy "Users can insert messages in their conversations." on messages for insert with check (
    auth.uid() = sender_id and
    auth.uid() in (select profile_id from conversation_members where conversation_id = messages.conversation_id)
);
create policy "Users can update their own messages." on messages for update using (auth.uid() = sender_id);
create policy "Users can delete their own messages." on messages for delete using (auth.uid() = sender_id);

-- 19. Notifications
create table if not exists notifications (
    id uuid primary key default uuid_generate_v4(),
    recipient_id uuid references profiles(id) on delete cascade not null,
    actor_id uuid references profiles(id) on delete cascade,
    type text not null,
    reference_id uuid,
    is_read boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table notifications enable row level security;
create policy "Users can view their own notifications." on notifications for select using (auth.uid() = recipient_id);
create policy "Users can update their own notifications." on notifications for update using (auth.uid() = recipient_id);

-- 20. Reports
create table if not exists reports (
    id uuid primary key default uuid_generate_v4(),
    reporter_id uuid references profiles(id) on delete cascade not null,
    target_type text not null,
    target_id uuid not null,
    reason text not null,
    status text default 'pending' check (status in ('pending', 'reviewed', 'dismissed', 'resolved')),
    created_at timestamp with time zone default timezone('utc'::text, now())
);

alter table reports enable row level security;
create policy "Users can view their own reports." on reports for select using (auth.uid() = reporter_id);
create policy "Users can insert their own reports." on reports for insert with check (auth.uid() = reporter_id);


-- STORAGE BUCKETS AND POLICIES

-- Insert storage buckets (requires standard supabase permissions usually available on dashboard or via initial setup)
insert into storage.buckets (id, name, public) values 
('avatars', 'avatars', true),
('covers', 'covers', true),
('post-media', 'post-media', true),
('project-media', 'project-media', true),
('portfolio-media', 'portfolio-media', true)
on conflict (id) do nothing;

-- Policies for avatars
create policy "Avatar images are publicly accessible." on storage.objects for select using (bucket_id = 'avatars');
create policy "Users can upload their own avatars." on storage.objects for insert with check (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can update their own avatars." on storage.objects for update using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can delete their own avatars." on storage.objects for delete using (bucket_id = 'avatars' and auth.uid()::text = (storage.foldername(name))[1]);

-- Policies for covers
create policy "Cover images are publicly accessible." on storage.objects for select using (bucket_id = 'covers');
create policy "Users can upload their own covers." on storage.objects for insert with check (bucket_id = 'covers' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can update their own covers." on storage.objects for update using (bucket_id = 'covers' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can delete their own covers." on storage.objects for delete using (bucket_id = 'covers' and auth.uid()::text = (storage.foldername(name))[1]);

-- Policies for post-media
create policy "Post media are publicly accessible." on storage.objects for select using (bucket_id = 'post-media');
create policy "Users can upload their own post-media." on storage.objects for insert with check (bucket_id = 'post-media' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can update their own post-media." on storage.objects for update using (bucket_id = 'post-media' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can delete their own post-media." on storage.objects for delete using (bucket_id = 'post-media' and auth.uid()::text = (storage.foldername(name))[1]);

-- Policies for project-media
create policy "Project media are publicly accessible." on storage.objects for select using (bucket_id = 'project-media');
create policy "Users can upload their own project-media." on storage.objects for insert with check (bucket_id = 'project-media' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can update their own project-media." on storage.objects for update using (bucket_id = 'project-media' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can delete their own project-media." on storage.objects for delete using (bucket_id = 'project-media' and auth.uid()::text = (storage.foldername(name))[1]);

-- Policies for portfolio-media
create policy "Portfolio media are publicly accessible." on storage.objects for select using (bucket_id = 'portfolio-media');
create policy "Users can upload their own portfolio-media." on storage.objects for insert with check (bucket_id = 'portfolio-media' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can update their own portfolio-media." on storage.objects for update using (bucket_id = 'portfolio-media' and auth.uid()::text = (storage.foldername(name))[1]);
create policy "Users can delete their own portfolio-media." on storage.objects for delete using (bucket_id = 'portfolio-media' and auth.uid()::text = (storage.foldername(name))[1]);
