import React from 'react';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default function ShowcasePage() {
  return (
    <div className="stitch-screen-wrapper">

      <div className="flex max-w-container-max mx-auto pt-24 px-4 md:px-margin-desktop">


        <main className="flex-1 pb-20 overflow-hidden lg:pl-8 min-w-0">
          <div className="flex flex-col gap-8 w-full pb-20">

            <div className="flex items-center justify-between gap-4 overflow-x-auto scrollbar-hide pb-2">
              <div className="flex items-center gap-2">
                <button className="px-5 py-2 rounded-full bg-primary text-on-primary font-label-md text-label-md whitespace-nowrap shadow-md">All Projects</button>
                <button className="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-high transition-colors border border-outline-variant/30">Silk Weaving</button>
                <button className="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-high transition-colors border border-outline-variant/30">Haute Couture</button>
                <button className="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-high transition-colors border border-outline-variant/30">Traditional Karakou</button>
                <button className="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-high transition-colors border border-outline-variant/30">Embroidery Art</button>
                <button className="px-5 py-2 rounded-full bg-surface-variant text-on-surface-variant font-label-md text-label-md whitespace-nowrap hover:bg-surface-container-high transition-colors border border-outline-variant/30">Modern Textiles</button>
              </div>

              <div className="hidden lg:flex items-center gap-2 min-w-max">
                <span className="font-label-md text-on-surface-variant">Filter by:</span>
                <button className="font-label-md text-on-surface flex items-center gap-1 hover:text-primary transition-colors">
                  Recommended <span className="material-symbols-outlined text-[16px]">expand_more</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

              <div className="lg:col-span-5 relative rounded-[32px] overflow-hidden aspect-[4/3] shadow-lg group cursor-pointer">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBx9qB3WUz3kSCSqB6HqejxyDsBzcYE8MdNI17bxMo9RM2bAtfeSL4sTAsGnRufL8F5BCMfQhghrR8kgS7dsvhyte_CLp8_jDLPHdqzOURHe_HT6sqgGlTsZeI5YmzS2AB2wClXSqcrGalqKSzfOqRUwwuI9qF5d3jrW3UFK_0h2t7-zVCTUW9-81LdhdqAhqGRzkgf18yhSY0QbpPbfucViXTdbeepMe234qk__a7-h37-mX_2nrFDxV9mSpZDMIMBVz4uHp2OsPw" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Golden Threads" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="text-[12px] font-bold text-white/80 uppercase tracking-widest mb-2 block">Featured Collection</span>
                  <h2 className="font-display-lg text-display-lg text-white mb-4 leading-tight">Golden Threads of Tlemcen</h2>
                  <div className="flex items-center gap-3">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCaodquKYuIP8HVzsfd6Eu9fEij3nkF1rdHqICChyghV5OyHMvK9o4RmEuWehix5yFwgsoHbJngOfTXG5-WiHZ0a-oxOVMktokVghxPt7mej6uQ6JZ_omDHvXqSkuXeiSQOWcGcjPf8-wRYjsDisCPjqpvqgLVzUqBYXTz610HOO2QQpWoL-um7T7nhi5b2WWZ-2lI_bJBXM6ytvBKZkIh2HDREvgXerNdKXzBVJQFXb0e08iUtf03azaQaV5sClDvswn0w7-rtCuk" className="w-8 h-8 rounded-full border border-white/30" alt="Author" />
                    <span className="font-label-md text-white/90">Layla Benali • Master Weaver</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 bg-[#F2EDE9] rounded-[32px] p-8 flex flex-col justify-center border border-outline-variant/20 shadow-sm relative overflow-hidden">
                <div className="relative z-10">
                  <h3 className="font-headline-md text-headline-md text-primary mb-3">New Talent</h3>
                  <p className="font-body-md text-on-surface-variant mb-6 leading-relaxed">
                    Discover emerging designers redefining Algerian textile traditions.
                  </p>
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-full font-label-md text-label-md shadow-md hover:shadow-lg transition-all active:scale-95 w-max">
                    Explore Roster
                  </button>
                </div>
              </div>

              <div className="lg:col-span-3 relative rounded-[32px] overflow-hidden aspect-[4/3] lg:aspect-auto shadow-sm group cursor-pointer">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIVPat6GRUPxMJV8xysv9-Hh2nuyB91e94zmZaprKwyD81U-j43Nh1BnmufCVspPOt_oNMS44SI3xSAo44LJeGBRlxWIVGou9UKMDLDNsUOP90o4cnnP5qRPvrwkU-KrL086XyVcXfm3OsZn2vMJQGRjqJlG2rIS-TQbRwma_Nznt9MP6kFhZ80gIBjEU9Jdj_PzkE0xJQU3ekz-xLeCxPkyx1EZ3K265i49bMJcj0jXJBS8wOvgc_HvsJP4ycpQm_D_AlypzmtAg" className="absolute inset-0 w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Guide" />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 flex items-center justify-center p-6 text-center">
                  <h3 className="font-title-lg text-title-lg text-white">Autumn '24 Materials Guide</h3>
                </div>
              </div>

            </div>

            <div className="mt-8">
              <h2 className="font-headline-md text-headline-md text-on-surface mb-8">Professional Showcase</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                <div className="group cursor-pointer">
                  <div className="w-full aspect-[4/5] rounded-[32px] overflow-hidden mb-4 shadow-sm bg-surface-variant">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtS0RhCHpOejfK2ZdNhau4igD0DDhO6Ua26zHU5XhS0iHWICPF6Mhi4POA14jbtoAg4dt9RsqLYSari6KMY1HH0Gxvvymj_dOHXgMWRJ3FaoL-eu2oZXhwbhG2gCvmauD-woOphFMbCcBMZEJzLR0B-xBlQXjuX9-mc1CQhcrA3xxQjN37UQJKQLJjg5Ey2YcjtLqvbIWj17n4VZdrfCVW4Gemk7z3vqX851w28mIAcwWTKNYSZP4zpDJ9HRyfZF074qCfGGCavDM" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Linen" />
                  </div>
                  <div className="flex items-start justify-between px-2">
                    <div>
                      <h4 className="font-title-md text-title-md text-on-surface mb-1">Coastal Linen Series</h4>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">Atelier Al-Bahr • Sustainable</p>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">thumb_up</span> 892</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> 2.1k</span>
                    </div>
                  </div>
                </div>

                <div className="group cursor-pointer">
                  <div className="w-full aspect-[4/5] rounded-[32px] overflow-hidden mb-4 shadow-sm bg-surface-variant">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBl6KOnPdva_SBHveLMu4pvLdzKTTBu6n_qFAfw8isxOf_0SYiGdjKhqK9_kEj7VxDE-WpSkQ3o1BmszoJMF_S_2HmrdyAdQQS4Fj7OZnZ_O7z2XNKRgND3zmScyR9QYAptmRDBTSdCkuq5BKGl8UHWsfc_3uhxCO7v1F5KxfT8qFGUwYTqds__lsMDPEPj7AMP0n1dSZTzLddp9oVz5JKYv3LvrJHRFfqO4tgTXuRYqCNAdoG8Rrlbv4qsDhNuuS8TQeOQgbG7zes" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Modernist" />
                  </div>
                  <div className="flex items-start justify-between px-2">
                    <div>
                      <h4 className="font-title-md text-title-md text-on-surface mb-1">Nomadic Modernist</h4>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">Yanis Dris • Menswear</p>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">thumb_up</span> 2.4k</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> 6.8k</span>
                    </div>
                  </div>
                </div>

                <div className="group cursor-pointer">
                  <div className="w-full aspect-[4/5] rounded-[32px] overflow-hidden mb-4 shadow-sm bg-surface-variant">
                    <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA1_P_McTG6T0r-whpcZdGCSlyUaXrI1MwnJmc2c1uCQIgnTMkcmjQePR4E0iqjzI9t5kr8kjvVf5QevPKD5Ve9LTrT5tjsSbTL1_5MNCmtpuX7prZ8NYXODi3v4sI5m5toKfyFK6PImnOKRXUcJiYrfORJWgGjV-hBdVsOI2HaibmvzU4Gdfn0003AHZxXpazS8xSXnS2DlYTgJYX7WJaQ0zrKyLiFwccjhqX-8fEzOhAKK2tk8JpRoAFYXhRYqacq1fug_WHvrOk" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt="Saffron" />
                  </div>
                  <div className="flex items-start justify-between px-2">
                    <div>
                      <h4 className="font-title-md text-title-md text-on-surface mb-1">The Saffron Route</h4>
                      <p className="font-body-sm text-[12px] text-on-surface-variant">Dounia A. • Accessories</p>
                    </div>
                    <div className="flex items-center gap-3 text-[12px] text-on-surface-variant">
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">thumb_up</span> 530</span>
                      <span className="flex items-center gap-1"><span className="material-symbols-outlined text-[14px]">visibility</span> 1.4k</span>
                    </div>
                  </div>
                </div>

              </div>

              <div className="mt-12 flex justify-center">
                <button className="px-8 py-3 border border-primary text-primary rounded-full font-label-md hover:bg-primary/5 transition-all">
                  Discover More Excellence
                </button>
              </div>

            </div>
          </div>
        </main>
      </div>

      <div className="fixed bottom-8 right-8 md:hidden">
        <button className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all">
          <span className="material-symbols-outlined">add</span>
        </button>
      </div>
    </div>
  );
}
