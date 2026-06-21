import React from 'react';
import Logo from '@/components/Logo';
import Link from 'next/link';

export default function MessagesPage() {
  return (
    <div className="stitch-screen-wrapper">


      <div className="flex pt-16 h-screen">

        <aside className="h-screen w-64 fixed left-0 top-0 pt-20 bg-surface-container-low dark:bg-surface-dim flex flex-col gap-2 p-4 hidden lg:flex overflow-y-auto custom-scrollbar pb-6">
          <div className="mb-8 px-2">
            <h2 className="font-headline-sm text-headline-sm text-primary">Maison de Couture</h2>
            <p className="font-label-md text-label-md text-on-surface-variant">Algiers, DZ</p>
          </div>

          <button className="mt-auto bg-primary text-on-primary py-3 px-4 rounded-full font-label-md hover:opacity-90 transition-all flex items-center justify-center gap-2 mb-4">
            <span className="material-symbols-outlined text-sm" data-icon="add">add</span>
            Publish Project
          </button>
        </aside>

        <main className="lg:ml-64 flex-grow h-full bg-background relative overflow-hidden flex">
          <div className="amazigh-pattern absolute inset-0 pointer-events-none"></div>

          <section className="w-full md:w-80 lg:w-96 flex flex-col border-r border-outline-variant bg-surface-container-lowest z-10">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h1 className="font-headline-sm text-headline-sm text-on-surface">Messages</h1>
                <button className="p-2 hover:bg-surface-container rounded-full text-primary">
                  <span className="material-symbols-outlined" data-icon="edit_square">edit_square</span>
                </button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant text-sm" data-icon="search">search</span>
                <input className="w-full pl-10 pr-4 py-2 bg-surface-container rounded-xl border-none focus:ring-2 focus:ring-primary text-label-md" placeholder="Search discussions..." type="text" />
              </div>
            </div>
            <div className="flex-grow overflow-y-auto custom-scrollbar">

              <div className="p-4 bg-primary-container/10 border-l-4 border-primary cursor-pointer transition-colors">
                <div className="flex gap-4">
                  <div className="relative">
                    <img className="w-12 h-12 rounded-full object-cover" data-alt="A portrait of a female Algerian textile designer in her 30s. She is wearing a traditional kabyle-inspired modern scarf. Her workshop background is softly blurred, showing looms and rolls of vibrant silk. The lighting is warm and golden-hour style." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2_x3_d3fVvyfHmnTf9fgvjmwC81AdX3f4JADyna4UXNNDoa9V1sUEQHWINsexZUMDixO7iZAbFXpFardkBjutDk8WcuQeqPDdqD3Uezidv6ERUlKShh1oKH15AAha-fLMeYY3NgXAxrnq5X-yl99hkJ6GJixSKAT1CAoHK5xMpKZGaMuz1KzmY8-6WskzJIyvFPNcL3XBlPCA567Jv1HALykY7BJDjZV0e4Xoa_YjUFRexhnb88GErM9c2T4CaVfquy1zZb9TsTc" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-label-md text-label-md text-on-surface truncate">Leila Belkacem</h3>
                      <span className="text-[10px] text-on-surface-variant font-medium">10:24 AM</span>
                    </div>
                    <p className="text-sm text-primary font-semibold truncate">Sample for the silk blend...</p>
                  </div>
                </div>
              </div>

              <div className="p-4 hover:bg-surface-container transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <img className="w-12 h-12 rounded-full object-cover" data-alt="Close-up of an elderly Algerian master tailor with weathered hands, measuring a piece of deep indigo wool. The lighting is focused and cinematic, creating high-contrast shadows. The setting is a traditional atelier with wooden textures and antique sewing tools." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDQqWvx-XEkF3kIz7IfbDKJ_zEzBMaKlbtbEdJ6f7ImIhCW4ZOeQkTCg774sPTDbDoulWLTvmO6SuxSpiuPOntp780WT55dLAg_zD_8Cj-tvuC3WgdSr64Xl8ZyLC8XtAXmYI5vDCaKyKjsm7NdAs7sgJqI0e8fwNafFeYL7z7uqL37TrjpgzXet1TNV-gw97I8oKtXJsR6XDt_xGuYahSApIL28AXr5j_Vefzc8bbO4MR8WdB-2g5sfqPf_XtG1kETQHm_t_kjVrA" />
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-label-md text-label-md text-on-surface truncate">Master Amine</h3>
                      <span className="text-[10px] text-on-surface-variant font-medium">Yesterday</span>
                    </div>
                    <p className="text-sm text-on-surface-variant truncate">The pattern is ready for review.</p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-surface-container transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <div className="w-12 h-12 rounded-full bg-secondary-fixed flex items-center justify-center font-bold text-on-secondary-fixed-variant">
                    FC
                  </div>
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-label-md text-label-md text-on-surface truncate">Fashion Collective Algiers</h3>
                      <span className="text-[10px] text-on-surface-variant font-medium">Mon</span>
                    </div>
                    <p className="text-sm text-on-surface-variant truncate">Zohra: Looking for a weaver...</p>
                  </div>
                </div>
              </div>
              <div className="p-4 hover:bg-surface-container transition-colors cursor-pointer">
                <div className="flex gap-4">
                  <img className="w-12 h-12 rounded-full object-cover" data-alt="A young creative professional woman with curly hair, sitting in a bright sunlit cafe in Algiers. She is looking at her phone with a slight smile. The background shows blurred Mediterranean architecture. The overall mood is airy, light, and optimistic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDjNQGwW1FtqIG_ah_xaGi5iM0ey8YiUptImzA8i5UWqO6E7ZXIkY50nQYHooP2zEWVNH4VITf8nQ3CYvxG1VRbS0AgIi9SHRUCJBazI4xSuwC68rKyjb_wTuBfxUepqPdczQIEx15cgZV4q3W6F5Si6rInzlRTWD094ovfzwFCUoz9Pd2NVMAlrudU33MrBrutRbcPJUTfq_uF9fTjXvhrrsf4qEFQ9Ux4NgdoWBVdZUQfmqKaZx7Xa61XB8stXzYNkyoza5kBdVI" />
                  <div className="flex-grow min-w-0">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-label-md text-label-md text-on-surface truncate">Sarah Mansouri</h3>
                      <span className="text-[10px] text-on-surface-variant font-medium">Oct 24</span>
                    </div>
                    <p className="text-sm text-on-surface-variant truncate">Thank you for the contact!</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="flex-grow flex flex-col bg-surface-bright/40 z-10">

            <div className="px-6 py-4 flex items-center justify-between border-b border-outline-variant glass-panel">
              <div className="flex items-center gap-4">
                <img className="w-10 h-10 rounded-full object-cover" data-alt="Close up of Leila Belkacem. High end fashion portraiture style, focused on the textures of the Mediterranean artisan brand. Professional and creative aesthetic." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCpseisRpu0Av3ExuPt5ao6WzJxF6xC66QCa7qGJMNQfpNmHmdECgVJiUPcDa21ihQQRThYL46YSS-TIJ3M3jzSafr20t8TUppf62v2Oq6Wn-Rssg71E5ERfhU_pNBA4UGXFI1cN2OAz0xaJLGZkSHCPPTcsyFOQt8dCPU3ctczDpoLILlwdExnDzQx4_z1lqnyUyeoZfUhpAP1PKo4BJaim7xRoXMXT_LtzNkRGLGzXIwD4tU6ZysnQp-nOxoqa9_7j7M58AiFPCg" />
                <div>
                  <h2 className="font-title-lg text-title-lg text-on-surface leading-tight">Leila Belkacem</h2>
                  <p className="text-[12px] text-green-600 font-bold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-green-600 rounded-full"></span> Online
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant transition-all">
                  <span className="material-symbols-outlined" data-icon="call">call</span>
                </button>
                <button className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant transition-all">
                  <span className="material-symbols-outlined" data-icon="videocam">videocam</span>
                </button>
                <button className="p-2 hover:bg-surface-container-high rounded-full text-on-surface-variant transition-all">
                  <span className="material-symbols-outlined" data-icon="more_vert">more_vert</span>
                </button>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-8 flex flex-col gap-6 custom-scrollbar">
              <div className="flex flex-col items-center my-4">
                <span className="px-4 py-1 bg-surface-container-high rounded-full text-[10px] font-bold text-on-surface-variant uppercase tracking-widest">October 26, 2023</span>
              </div>

              <div className="flex gap-3 max-w-[80%]">
                <img className="w-8 h-8 rounded-full object-cover mt-auto" data-alt="Small avatar of Leila Belkacem in a creative professional setting." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQSHgTo9NnSJEaiBWqmvgkhTP8eVf_BUl5MXJM3SKpLrArd2BOOoONEHnNyf-ikbUCsTX9Ug90u-XfngiMhOPvmRq0LSKVqM76DeJ0LPwiuWnhhLzFt5eHb5rJzGB2h-hT3CfVUblyZ6M_QZpcvUSlIMo5KjNCfyIRBppddp4YNn3LBzYCwL-o_xQHJkezOezSN6YAHLuRkU-EwjnSlwdsf8EzCV7yc7ss27h6OMW4HNZuZEdYeXKhuYHHWCS-WlI3GBtRjBpK5mk" />
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-outline-variant/30">
                  <p className="text-on-surface text-body-md">Good morning! I've been working on the silk blend samples we discussed for the Winter collection. The drape is coming out beautifully.</p>
                  <span className="block text-[10px] text-on-surface-variant mt-2 text-right">09:15 AM</span>
                </div>
              </div>

              <div className="flex gap-3 max-w-[80%] ml-auto flex-row-reverse">
                <div className="bg-primary p-4 rounded-2xl rounded-br-none shadow-md">
                  <p className="text-on-primary text-body-md">That's fantastic news, Leila. Did you manage to incorporate the traditional diamond motif into the weave?</p>
                  <span className="block text-[10px] text-on-primary/70 mt-2 text-right">09:42 AM</span>
                </div>
              </div>

              <div className="flex gap-3 max-w-[80%]">
                <img className="w-8 h-8 rounded-full object-cover mt-auto" data-alt="Small avatar of Leila Belkacem." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXKnrZdGoL_ii1iVzCEVo96JSIIm1JDx4RBc2jPhi8OB_i5k7KTUfF-OGYlyMT5CfdbV7P0c-eRbPnv0R3_z8g4-nwwO7eUMiM53xsYT7_4whzjp1QHGtLC4XslgndHOfO7iDJh2GNieJkbFBFa1zSXIRXSxQ_wGU54jdcYsqZONdgV5rVNxgi2s4pdOkUVP0cu0NYPbs0PcgkzGSwid1oczgXxclQJ7EBu_aKunDf7InSwyCtY5y8Btmthf8Fszsjmcv4iKU8Xbs" />
                <div className="bg-white p-4 rounded-2xl rounded-bl-none shadow-sm border border-outline-variant/30">
                  <p className="text-on-surface text-body-md mb-4">Yes, I did! I've attached a high-res photo of the first swatch. It has that subtle sheen we were aiming for.</p>
                  <div className="rounded-xl overflow-hidden border border-outline-variant/50">
                    <img className="w-full h-48 object-cover" data-alt="A close-up shot of a luxurious silk fabric with a subtle geometric diamond weave. The color is a soft ivory-beige. The light catches the sheen of the threads, highlighting the intricate artisanal craft. Professional fashion macro photography with soft focus in the background." src="https://lh3.googleusercontent.com/aida-public/AB6AXuB8-y3Kog42lis-Krqmje_O2i3jc46bSdIbn0N5SCS2VinzDvcgdQ1srNMkE7ZgJNLWwUSmmzkTfuhJxa04M5rel1Z4TzP1jqO8FuXxb0aOudrPOhALQc_-K94ALbI8WcVXPCWr1iD1o7Fa2VhUTKNoB5a01A5PcEaeDJS5Bblmx8K-gz6xXv4TB55aiB-Or8ODJqpLyxGje7J5uRQ0Fonyzz_cQeSwfTEQzppgdHZfW2BOOxx7gBED2fkA5Flxld1nqrmBDXjH3Ck" />
                    <div className="bg-surface-container p-3 flex items-center justify-between">
                      <span className="text-[12px] font-bold text-primary truncate">Silk_Swatch_V1_HighRes.jpg</span>
                      <span className="material-symbols-outlined text-primary cursor-pointer hover:scale-110 transition-transform" data-icon="download">download</span>
                    </div>
                  </div>
                  <span className="block text-[10px] text-on-surface-variant mt-2 text-right">10:24 AM</span>
                </div>
              </div>
            </div>

            <div className="p-6 glass-panel border-t border-outline-variant">
              <div className="bg-white rounded-3xl border border-outline-variant p-2 flex items-center gap-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20 transition-all">
                <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                  <span className="material-symbols-outlined" data-icon="add_circle">add_circle</span>
                </button>
                <button className="p-2 hover:bg-surface-container rounded-full text-on-surface-variant">
                  <span className="material-symbols-outlined" data-icon="mood">mood</span>
                </button>
                <input className="flex-grow border-none focus:ring-0 text-body-md placeholder:text-outline/60" placeholder="Discuss your next masterpiece..." type="text" />
                <button className="w-10 h-10 bg-primary text-on-primary rounded-full flex items-center justify-center hover:shadow-lg active:scale-95 transition-all">
                  <span className="material-symbols-outlined" data-icon="send">send</span>
                </button>
              </div>
            </div>
          </section>

          <section className="hidden xl:flex w-72 flex-col border-l border-outline-variant bg-surface-container-low p-6 gap-8 z-10 overflow-y-auto custom-scrollbar">
            <div className="text-center">
              <img className="w-24 h-24 rounded-full mx-auto object-cover border-4 border-white shadow-md mb-4" data-alt="Leila Belkacem profile portrait for contact details." src="https://lh3.googleusercontent.com/aida-public/AB6AXuCH5Hqf4WS2jcR56roC9hvOXDkfHRSyg1tqdpuOEDjMCCDW_90xqdv1DfEQoPZkG8iDozcHvjOM4a1G7VNilO2ITiEVLokwt5W-Ho75E7O1jBReiK3AsdCJ9ZeSMtzyJ6T8IzxAB4YtfZgDNhranCaxRNghcnTsqRdznFFzS5cpeB7igDw4QDhviKpNHSVejcdiskv2KAiS1yQV9T7JDkCRQqOKh87EZvahZma94mmBma2JWiC0izEB7QE6VLi1GsDG-IkbO3_uikE" />
              <h2 className="font-title-lg text-title-lg text-on-surface">Leila Belkacem</h2>
              <p className="font-label-md text-label-md text-primary">Senior Textile Designer</p>
            </div>
            <div className="flex gap-2 justify-center">
              <button className="flex-1 py-2 bg-white border border-outline-variant rounded-lg font-label-md text-on-surface hover:bg-surface-container transition-all">Profile</button>
              <button className="flex-1 py-2 bg-white border border-outline-variant rounded-lg font-label-md text-on-surface hover:bg-surface-container transition-all">Mute</button>
            </div>
            <div>
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest mb-4">Shared Media</h3>
              <div className="grid grid-cols-2 gap-2">
                <div className="aspect-square rounded-lg bg-surface-variant overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img className="w-full h-full object-cover" data-alt="A swatch of deep emerald green velvet fabric." src="https://lh3.googleusercontent.com/aida-public/AB6AXuALZ00QP-vg9n5Q_5iN7IDL_wpcOk_XPoiGf73ibZmQN9Y3tm2Tfj_giL0w502PNpYcEqg2FicVxbmUZoT4IEKRLDF4wnmu06tZBS0oSXEcr2qc46YWqYCu2dUE-zsrluEOfw5FMa650FLPKhNCR5XlCiiuBduUP-UTsiNxn6FODcw-EN6wfQQw5Wax-3M2CF_XzYqqghEb1qYbzZzO8Mn3xMy9zSwQTs3s_GxuV4RhlYY3CJ8dksj2HNBqgpNXFy_ZfADt4ztUqvo" />
                </div>
                <div className="aspect-square rounded-lg bg-surface-variant overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img className="w-full h-full object-cover" data-alt="Rolls of high quality linen in earth tones." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDySD3gkXHZrQko9zoF0Z0Zq7KX1ijGD42hYhWbruwsR8gYkcO8VIQOgy9hwAeZfVRm409mDwU-_0mEv8Q_yM1BLM3BLAYWPmrvVfSSIuw-KmYvZexuTpB7Xc5rDVFLXITN2zJKjR3rFhw6SJx64bCYGN7yTtG1kGVMsT7-983YgtDctDg9kHEZCwoeYgJkn7TRWgojBHSPdIpYCbr5v59FHfL8txcdrlDRgjPlvIUFh9gB4pM6DmQR78JzwTamZn7MTnYnZNluAPc" />
                </div>
                <div className="aspect-square rounded-lg bg-surface-variant overflow-hidden cursor-pointer hover:opacity-80 transition-opacity">
                  <img className="w-full h-full object-cover" data-alt="Close up of a metallic gold thread embroidery on black silk." src="https://lh3.googleusercontent.com/aida-public/AB6AXuDqktTivBC-biMrt7wH6Ktm5Xutpr6JiL22n-8wMbVoSbWx4T17HKW7-Smea6UsRsVnUlJ3r60dowWLp1mYV1psJD_ADLIBRKbL6GOCBb7h3P2_NKCnpWZCZ4yD1utcukYYvYNytyXwmlARYXJ7D4c4wPRQJRwFZNliKvW8Jqj-bwbDc9qjAxSLQbxTwGJn0JNjllOZwgu10P9SzHKmkz66Ul1_WAFJNFn1bN478NzrgGbD7m5phM31zz3NGeu54a_-AMn00PlXFGA" />
                </div>
                <div className="aspect-square rounded-lg bg-surface-container-high flex items-center justify-center font-bold text-primary cursor-pointer hover:bg-surface-container-highest transition-colors">
                  +12
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="font-label-md text-label-md text-on-surface-variant uppercase tracking-widest">Active Projects</h3>
              <div className="p-4 bg-white rounded-xl border border-outline-variant/50">
                <p className="font-label-md text-on-surface">Winter Heritage 2024</p>
                <p className="text-[12px] text-on-surface-variant">In Progress • Updated Today</p>
              </div>
              <div className="p-4 bg-white rounded-xl border border-outline-variant/50">
                <p className="font-label-md text-on-surface">Sahara Nomad Collection</p>
                <p className="text-[12px] text-on-surface-variant">Planning • 3 weeks ago</p>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
