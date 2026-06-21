import React from 'react';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default function ProfilePage() {
  return (
    <div className="stitch-screen-wrapper">
      
<main className="pt-20 pb-12">

<div className="relative w-full h-[400px] overflow-hidden bg-surface-dim group">
<img className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105" data-alt="A cinematic, wide-angle shot of a high-end textile atelier in Algiers, featuring sunbeams filtering through delicate silk fabrics hanging from the ceiling. The environment is filled with rich textures of wool, linen, and hand-woven tapestries in soft earthy tones and deep teal accents. The mood is sophisticated and peaceful, reflecting a Mediterranean artisan aesthetic with warm, natural afternoon lighting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUsYYGzCT_c3gCYs6P3jjNIReh7-GdkrOEYQx6NiTMAqPXZQ8GxwWCGDNrYzWrU-9__vuxDgGASKEcFHnBUOOyhJ45NdNiFCHP88fgxzeERR_mqIlwt-oOdlrqw_eJoCg_swHtuLl1tX5SVZLQRzgaREstZGbmUFO3voPR8FkFu4QPMcm0H4vG0e1d2u9Z9U8dMy9k05lTF6MOY66iuO2DhSaDmL_B67k-784nZWi23QtRDRSVzFrTDVAfK0utJzhmBO6M88NAR_Q"/>
<div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
<div className="absolute bottom-10 left-margin-desktop right-margin-desktop flex justify-between items-end max-w-container-max mx-auto">
<div className="flex items-center gap-8">
<div className="w-40 h-40 rounded-3xl border-4 border-surface shadow-xl overflow-hidden bg-white translate-y-20">
<img className="w-full h-full object-cover" data-alt="A professional portrait of Amina Kerroum, a master Algerian textile designer, with a warm and confident expression. She is wearing a modern, ethically sourced linen blazer over a traditional embroidered scarf. The background is a softly blurred architectural studio with minimalist lines and warm Mediterranean light. The overall aesthetic is contemporary, elegant, and rooted in heritage." src="https://lh3.googleusercontent.com/aida-public/AB6AXuANf5msGfpBwraVf80zGPy0n3JBSPQp6MJnVF9YgMG58-etwGk_a54lmk8QfX1EXbv_uilQ--5g1qGqkj96Jq1s1HxQHwrKM6G_8JXsDi61ArduC2YHPX5ze6HdbARr2B9o5apGNiSMVlfuqennc3iCRJIveZmPd62P4gyjNBOTihnjFjw_D11zWSkiNWJOe3Z6RVlGJURqPC2HDH2q0aCLd_2puyyNjN6gV3ToAS27HUt0Pgw4OeZJWV2jaKEJ_mkq1zOIZGRgRo4"/>
</div>
<div className="text-white pb-4">
<h1 className="font-headline-md text-headline-md mb-1">Amina Kerroum</h1>
<p className="font-body-lg text-body-lg opacity-90">Master Couturier &amp; Textile Innovator</p>
</div>
</div>
<div className="flex gap-4 pb-4">
<button className="px-8 py-3 bg-white text-primary font-label-md text-label-md rounded-full shadow-lg hover:bg-surface-container-low transition-all active:scale-95 flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary">
<span className="material-symbols-outlined text-[18px]">chat_bubble</span> Message
                    </button>

</div>
</div>
</div>

<div className="max-w-container-max mx-auto px-margin-desktop mt-24 flex flex-col md:flex-row gap-gutter">

<aside className="w-full md:w-80 flex flex-col gap-8">
<div className="bg-white p-8 rounded-[24px] shadow-sm flex flex-col gap-6">
<div>
<h3 className="font-label-md text-label-md text-primary mb-2 uppercase tracking-widest">About</h3>
<p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                            Bridging the gap between ancient Amazigh weaving techniques and high-end contemporary fashion. Based in Algiers, specializing in hand-woven silk and sustainable embroidery.
                        </p>
</div>
<div className="h-px bg-outline-variant/30"></div>
<div className="flex flex-col gap-4">
<h3 className="font-label-md text-label-md text-primary uppercase tracking-widest">Expertise</h3>
<div className="flex flex-wrap gap-2">
<span className="bg-primary-fixed-dim/20 text-on-primary-fixed-variant px-3 py-1 rounded-full text-label-md font-label-md">Silk Weaving</span>
<span className="bg-primary-fixed-dim/20 text-on-primary-fixed-variant px-3 py-1 rounded-full text-label-md font-label-md">Pattern Making</span>
<span className="bg-primary-fixed-dim/20 text-on-primary-fixed-variant px-3 py-1 rounded-full text-label-md font-label-md">Sustainable Dyeing</span>
<span className="bg-primary-fixed-dim/20 text-on-primary-fixed-variant px-3 py-1 rounded-full text-label-md font-label-md">Heritage Restoration</span>
</div>
</div>
<div className="h-px bg-outline-variant/30"></div>
<div className="flex flex-col gap-4">
<h3 className="font-label-md text-label-md text-primary uppercase tracking-widest">Connect</h3>
<div className="flex flex-col gap-3">
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-outline">location_on</span>
<span className="text-body-md">Algiers, Algeria</span>
</div>
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-outline">language</span>
<span className="text-body-md">aminakerroum.dz</span>
</div>
<div className="flex items-center gap-3 text-on-surface-variant">
<span className="material-symbols-outlined text-outline">groups</span>
<span className="text-body-md">2.4k Connections</span>
</div>
</div>
</div>
</div>

<div className="bg-secondary-fixed text-on-secondary-fixed p-8 rounded-[24px] shadow-sm relative overflow-hidden">
<div className="relative z-10">
<h4 className="font-label-md text-label-md opacity-80 mb-4">Network Activity</h4>
<div className="flex flex-col gap-2">
<div className="flex justify-between items-end">
<span className="font-headline-sm text-headline-sm">14</span>
<span className="font-label-md text-label-md">Live Projects</span>
</div>
<div className="w-full bg-on-secondary-fixed/10 h-1.5 rounded-full overflow-hidden">
<div className="bg-secondary h-full w-3/4"></div>
</div>
</div>
</div>

<div className="absolute -right-4 -bottom-4 opacity-10">
<span className="material-symbols-outlined text-[120px]">pen_magic</span>
</div>
</div>
</aside>

<section className="flex-1">
<div className="flex justify-between items-center mb-8">
<h2 className="font-headline-sm text-headline-sm">Portfolio Showcase</h2>
<div className="flex gap-4">
<button className="font-label-md text-label-md text-primary border-b-2 border-primary">Featured</button>
<button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Collections</button>
<button className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Behind the Scenes</button>
</div>
</div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

<div className="md:col-span-2 group relative overflow-hidden rounded-[24px] bg-white shadow-sm hover:shadow-xl transition-all duration-500">
<div className="aspect-[16/9] overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A detailed macro shot of a luxurious indigo-dyed silk fabric with intricate silver hand-embroidery. The patterns are inspired by geometric Amazigh motifs, showing the fine craftsmanship and texture of the threads. The lighting is focused and dramatic, highlighting the shimmer of the silk and the relief of the stitching. High-end editorial photography style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB-nEmYRpmYGNMlR7Xc_Um9FbujQDTHltZgJFnwrtSGESr9Fx99A3rFXLC2osb_HmCBsPdt34joYCgK0lT07smjPAvq65_0uJTnXWuTu_WflSTjFmLH9Ixm-DDrC9thJ_jtytQxIme-vI9ydmZfwnOqSVUIJrrtPNKhmzQbNg4BrIAZS0Y9vaBoQq5zNzWjpp-JKL_Dw0_DyiBZJC-Zg8lDxSYmDYf5p6m3izDqCBuxR6Ma4rVIisuoDoiqh0jQl3X8Q66R9p1x_jE"/>
</div>
<div className="p-6">
<div className="flex justify-between items-start mb-2">
<h3 className="font-title-lg text-title-lg">The Blue Oasis Collection</h3>
<span className="bg-surface-container-high px-3 py-1 rounded-full text-[12px] font-bold uppercase tracking-wider">2024</span>
</div>
<p className="text-on-surface-variant line-clamp-2 mb-4">A sustainable couture collection using 100% natural indigo dyes and reclaimed heritage silk.</p>
<Link className="text-primary font-label-md text-label-md inline-flex items-center gap-2 group/link" href="#">
                                View Project <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
</Link>
</div>
</div>

<div className="group relative overflow-hidden rounded-[24px] bg-white shadow-sm hover:shadow-xl transition-all duration-500">
<div className="aspect-[4/5] overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A high-fashion portrait featuring a model wearing a structured, avant-garde wool vest with traditional Algerian leather appliqué. The setting is a bright, minimalist Mediterranean balcony overlooking Algiers. The lighting is crisp and natural, emphasizing the architectural lines of the garment. Sophisticated color palette of cream, tan, and forest green." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBp7xQgohR4980rX8ZHPmF0CkjykwjrSTtJ8zR_O8DXSZXHvylpDXHY0TuZR31EAtHhrvU_c30Kxwsky-jw0bAb5pm7f9EiNEoA1fV6GUTGy-gmxk51xTf-6omMXo-5kLSOqVU-w1LPFWFrKyCl6c_Zlqp5HdmCFi8g-wzPu29CN1mlOzs4tnkNbST2Ok-1nFB8jPoBRnJJT3uUbhaVKW2NUzNCy8bX2KWy9aBWosUilFGbJ5A86PTTYVTBgQATru0uOGTgTnpj3ks"/>
</div>
<div className="p-6">
<h3 className="font-title-lg text-title-lg mb-1">Modern Nomad Vest</h3>
<p className="text-on-surface-variant text-sm mb-4">Fusion of leather and wool.</p>
<Link className="text-primary font-label-md text-label-md inline-flex items-center gap-2 group/link" href="#">
                                Details <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
</Link>
</div>
</div>

<div className="group relative overflow-hidden rounded-[24px] bg-white shadow-sm hover:shadow-xl transition-all duration-500">
<div className="aspect-[4/5] overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="Close-up of a hand-woven tapestry being worked on a traditional loom. The artisan's hands are visible, weaving vibrant golden threads through a dark charcoal warp. The scene is atmospheric, with dust motes dancing in a single beam of light hitting the loom. The focus is on the intricate tension of the fibers and the artisanal process." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCjqePo8PT4dFhVRBkQVMBQYM5oHwJV8GHSe5YJfeb_N61fZdFtYenQgepuLC7dhhAYl3MSsKgPprh6okyES4HKn4SFncAUtg4_12mdjYIPwqoIbPrbFJsG_qIjjEcIW9-AaW21z7EZZXTBLvV7VV3kfeet-PyjNNifk_mW0FqQ9hhzfwz7d1xZ7uo05yeI1vtOGlcmrGo0bRlRCmXvAA2RA4nb5vRR73eNq90N22JXP9cw24N_WbusUORLS8Cp2blZ4S1jIukouKM"/>
</div>
<div className="p-6">
<h3 className="font-title-lg text-title-lg mb-1">The Golden Warp</h3>
<p className="text-on-surface-variant text-sm mb-4">Exploring tension and light.</p>
<Link className="text-primary font-label-md text-label-md inline-flex items-center gap-2 group/link" href="#">
                                Details <span className="material-symbols-outlined group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
</Link>
</div>
</div>

<div className="md:row-span-2 group relative overflow-hidden rounded-[24px] bg-white shadow-sm hover:shadow-xl transition-all duration-500">
<div className="h-full flex flex-col">
<div className="flex-1 overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A vertical editorial composition showing three draped lengths of artisanal linen hanging in a bright, whitewashed space. The fabrics have varying textures, from coarse hand-spun to fine sheer weaves. The color palette is monochromatic whites and beiges, evoking a sense of purity and natural elegance. Minimalist Mediterranean interior design style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuBgtmyf5UVX8sDIH3zgja-TTPtgJ-ZuCFhjrNp9uDRBT_lUndrAwa9JO6BPy9zsIEuS6f9jNU1s-QPuy0fuOSmp48wRBS-3V_kvA2EZwrO6dbWuWBvtsSJIQ1w7i_svX21O6vm4EEjhTN7zvlNvSzxECdDsVSbLBrp8LiBELOmFMd2teBIACq-MT6yw1AzqexaitPeSUO5Dc2Dw8sLt3TBk0l2rVW3x0fsi9eMt1Y5JoTLcMJQkmr_zIhKxUdCK87Yyok9Rw30BJ2M"/>
</div>
<div className="p-6 bg-white">
<h3 className="font-title-lg text-title-lg mb-2">Purity in Linen</h3>
<p className="text-on-surface-variant text-sm mb-4">A study of minimalist textures and natural fibers from the Kabylie region.</p>
<Link className="text-primary font-label-md text-label-md inline-flex items-center gap-2" href="#">
                                    Full Series <span className="material-symbols-outlined">north_east</span>
</Link>
</div>
</div>
</div>

<div className="md:col-span-2 group relative overflow-hidden rounded-[24px] bg-white shadow-sm hover:shadow-xl transition-all duration-500">
<div className="aspect-[2/1] overflow-hidden">
<img className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" data-alt="A wide panoramic view of a fashion runway show in a historic courtyard. Models are wearing voluminous, draped garments that blend traditional Algerian silhouettes with modern architectural cuts. The atmosphere is electric, with dramatic spotlighting and a diverse audience. The background features ancient stone arches and modern light installations." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA818IN_eHMeBazkH7a4spTvBrRa9dBSgSj-mDS1vHoe4ut-m3Ra2mRe21XWEBtAtC72yGQc5uboD5VhyFbpjpd-8GvUytMjicBKYW6LpRwMAF4KThw4sk_GoXXjBPM9oOEJQTEu4RxHUJi5m4XkQ-5JFcZgX0OErsutGUdTxog4G8aYW5pTUkvSiglaMYKS9de7uM54xTyu25YJD7cEWtJEKBEEZMcP0Y-OaaYMIFRZrUrkjrKV7vmD_NcqlnRsHF5Cyeny_Oe8wI"/>
</div>
<div className="p-6 flex items-center justify-between">
<div>
<h3 className="font-title-lg text-title-lg mb-1">Casbah Lights Runway</h3>
<p className="text-on-surface-variant text-sm">Fall/Winter 2023 Debut</p>
</div>
<button className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center hover:bg-primary-container transition-all active:scale-90 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2" aria-label="Play Video: Casbah Lights Runway">
<span className="material-symbols-outlined">play_arrow</span>
</button>
</div>
</div>
</div>
</section>
</div>
</main>
<footer className="mt-20 border-t border-outline-variant/20 bg-surface-container-low py-12">
<div className="max-w-container-max mx-auto px-margin-desktop flex flex-col md:flex-row justify-between items-center gap-8">
<div className="flex flex-col gap-2">
<Link href="/"><Logo className="h-12 w-auto object-contain" /></Link>
<p className="text-on-surface-variant text-sm">The Professional Network for Algerian Textile Heritage.</p>
</div>
<div className="flex gap-8">
<Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">Privacy Policy</Link>
<Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">Terms of Service</Link>
<Link className="text-on-surface-variant hover:text-primary transition-colors text-sm" href="#">Contact Support</Link>
</div>
<div className="text-on-surface-variant text-sm">
                © 2024 TIRAZY. All rights reserved.
            </div>
</div>
</footer>
    </div>
  );
}
