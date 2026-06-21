const https = require('https');
const fs = require('fs');
const path = require('path');

const screens = [
  { name: 'splash_page', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzYwOGIyNjZkYzc5ZDQ2ZWU5NGQ4N2NiNTA2MzAyZTNmEgsSBxCa1IfajQUYAZIBIwoKcHJvamVjdF9pZBIVQhM0NjIyNjA3ODg5MzM0NzgyMTg4&filename=&opi=89354086' },
  { name: 'home_feed', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzk2OGFjYWRiNTAzOTRjNWNiYzAyZTFjOTQyMTY3ODhiEgsSBxCa1IfajQUYAZIBIwoKcHJvamVjdF9pZBIVQhM0NjIyNjA3ODg5MzM0NzgyMTg4&filename=&opi=89354086' },
  { name: 'collaboration_hub', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzJhYjQ1MDAxMzJhOTQwODRhMjg0YzIwYzQ5NTUxMTAxEgsSBxCa1IfajQUYAZIBIwoKcHJvamVjdF9pZBIVQhM0NjIyNjA3ODg5MzM0NzgyMTg4&filename=&opi=89354086' },
  { name: 'professional_profile', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzI3ODk1YzRkYWZjMzRkNWViZjI1NTY5ZGQ5NDMxY2M5EgsSBxCa1IfajQUYAZIBIwoKcHJvamVjdF9pZBIVQhM0NjIyNjA3ODg5MzM0NzgyMTg4&filename=&opi=89354086' },
  { name: 'reports_center', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2Q2Y2RkZjhkZDRhNTRhMjViNDgzOWVlNWY5YjJhMGZjEgsSBxCa1IfajQUYAZIBIwoKcHJvamVjdF9pZBIVQhM0NjIyNjA3ODg5MzM0NzgyMTg4&filename=&opi=89354086' },
  { name: 'user_management', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2JmZTA4Y2NlNTU0NDQwNTk4ZmJlNTkzYTRjOGIxZjNlEgsSBxCa1IfajQUYAZIBIwoKcHJvamVjdF9pZBIVQhM0NjIyNjA3ODg5MzM0NzgyMTg4&filename=&opi=89354086' },
  { name: 'notifications_feed', url: 'https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzg1N2M5ZGUyM2UzMzRjNTQ4Zjc2NTZmZTE3YzI3NjAxEgsSBxCa1IfajQUYAZIBIwoKcHJvamVjdF9pZBIVQhM0NjIyNjA3ODg5MzM0NzgyMTg4&filename=&opi=89354086' }
];

const dir = path.join(__dirname, 'stitch_screens');
if (!fs.existsSync(dir)){
    fs.mkdirSync(dir);
}

screens.forEach(screen => {
  https.get(screen.url, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      fs.writeFileSync(path.join(dir, screen.name + '.html'), data);
      console.log('Downloaded', screen.name);
    });
  }).on('error', (err) => {
    console.error('Error downloading', screen.name, err);
  });
});
