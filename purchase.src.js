/* Sword of the Sky — purchase experience. Config first: edit CFG only. */
(() => {
'use strict';
const CFG = {
  currency: 'DZD',
  products: {                       // price: number in DZD, or null = NOT CONFIGURED (shows a placeholder)
    one: { slug: 'part-one', price: null, img: 'img[alt*="Part One"]', title: { en: 'Sword of the Sky — Part One', fr: 'Sword of the Sky — Tome 1', ar: 'سيف السماء — الجزء الأول' } },
    two: { slug: 'part-two', price: null, img: 'img[alt*="Part Two"]', title: { en: 'Sword of the Sky — Part Two', fr: 'Sword of the Sky — Tome 2', ar: 'سيف السماء — الجزء الثاني' } }
  },
  // Delivery fees. null = not configured (no fee shown). Example:
  // { office: { default: 400, byWilaya: { '16': 300 } }, home: { default: 700, byWilaya: {} } }
  deliveryFees: null,
  // Carrier coverage. Example: { office: { unavailableWilayas: ['33'] }, home: { unavailableWilayas: ['33','37'] } }
  coverage: null,
  orderEndpoint: '',                // e.g. '/api/orders' — POST JSON. Empty = no order system connected.
  contactPhone: '0664526766', contactDisplay: '06 64 52 67 66'
};
const DZ = window.SOS_DZ; // { w:[[code,fr,ar]], c:{code:[[fr,ar,daira]]} } — see algeria-admin.json
const T = {
  en: { h: 'Complete Your Order', back: 'Back', sum: 'Order Summary', qty: 'Quantity', unit: 'Price', fee: 'Delivery', total: 'Total', name: 'Full Name', phone: 'Phone Number', phoneH: 'e.g. 0555 12 34 56 or +213 555 12 34 56', wil: 'Wilaya', com: 'Commune / Baladiya', comFirst: 'Choose a wilaya first', meth: 'Delivery Method', office: 'Delivery to a pickup office', home: 'Home delivery', addr: 'Street address', addrD: 'Building, floor, landmark (optional)', pick: 'Preferred pickup office', pickH: 'Office name or area (the carrier’s office list is not configured yet)', confirm: 'CONFIRM ORDER', search: 'Search…', none: 'No match', nc: 'Not configured', tbd: 'Set the price in the configuration', feeNc: 'Not configured', feeAt: 'Shown once delivery rates are configured', eReq: 'This field is required.', ePhone: 'Enter an Algerian mobile number: 05/06/07 + 8 digits, or +213 followed by 9 digits.', eSel: 'Choose from the list.', eMeth: 'Please choose a delivery method.', eCov: 'This delivery method is not available for the selected wilaya.', eNone: 'No order system is connected yet, so nothing was sent or placed. Please order by phone or Instagram.', eNet: 'The order could not be sent. Nothing was placed — please try again.', busy: 'Sending your order…', ok: 'Order received', okT: 'Thank you. Your order has been received.', ref: 'Reference', home2: 'Back to the books', lang: 'Language', sel: 'selected' },
  fr: { h: 'Finalisez votre commande', back: 'Retour', sum: 'Récapitulatif', qty: 'Quantité', unit: 'Prix', fee: 'Livraison', total: 'Total', name: 'Nom complet', phone: 'Numéro de téléphone', phoneH: 'ex. 0555 12 34 56 ou +213 555 12 34 56', wil: 'Wilaya', com: 'Commune / Baladiya', comFirst: 'Choisissez d’abord une wilaya', meth: 'Mode de livraison', office: 'Livraison au bureau', home: 'Livraison à domicile', addr: 'Adresse', addrD: 'Bâtiment, étage, repère (facultatif)', pick: 'Bureau de retrait souhaité', pickH: 'Nom ou zone du bureau (la liste des bureaux du transporteur n’est pas encore configurée)', confirm: 'CONFIRMER LA COMMANDE', search: 'Rechercher…', none: 'Aucun résultat', nc: 'Non configuré', tbd: 'Définissez le prix dans la configuration', feeNc: 'Non configuré', feeAt: 'Affiché une fois les tarifs configurés', eReq: 'Ce champ est obligatoire.', ePhone: 'Entrez un mobile algérien : 05/06/07 + 8 chiffres, ou +213 suivi de 9 chiffres.', eSel: 'Choisissez dans la liste.', eMeth: 'Veuillez choisir un mode de livraison.', eCov: 'Ce mode n’est pas disponible pour cette wilaya.', eNone: 'Aucun système de commande n’est connecté : rien n’a été envoyé. Commandez par téléphone ou Instagram.', eNet: 'La commande n’a pas pu être envoyée. Rien n’a été enregistré — réessayez.', busy: 'Envoi de votre commande…', ok: 'Commande reçue', okT: 'Merci. Votre commande a bien été reçue.', ref: 'Référence', home2: 'Retour aux livres', lang: 'Langue', sel: 'sélectionné' },
  ar: { h: 'أكمل طلبك', back: 'رجوع', sum: 'ملخص الطلب', qty: 'الكمية', unit: 'السعر', fee: 'التوصيل', total: 'المجموع', name: 'الاسم الكامل', phone: 'رقم الهاتف', phoneH: 'مثال: 0555 12 34 56 أو ‎+213 555 12 34 56', wil: 'الولاية', com: 'البلدية', comFirst: 'اختر الولاية أولاً', meth: 'طريقة التوصيل', office: 'التوصيل إلى المكتب', home: 'التوصيل إلى المنزل', addr: 'العنوان', addrD: 'العمارة، الطابق، معلم قريب (اختياري)', pick: 'مكتب الاستلام المفضل', pickH: 'اسم المكتب أو المنطقة (قائمة مكاتب شركة التوصيل غير مُعدّة بعد)', confirm: 'تأكيد الطلب', search: 'بحث…', none: 'لا نتائج', nc: 'غير مُعدّ', tbd: 'حدّد السعر في ملف الإعدادات', feeNc: 'غير مُعدّ', feeAt: 'يظهر بعد إعداد أسعار التوصيل', eReq: 'هذا الحقل مطلوب.', ePhone: 'أدخل رقم هاتف جزائري محمول: 05/06/07 ثم 8 أرقام، أو ‎+213 ثم 9 أرقام.', eSel: 'اختر من القائمة.', eMeth: 'يرجى اختيار طريقة التوصيل.', eCov: 'طريقة التوصيل هذه غير متاحة لهذه الولاية.', eNone: 'لا يوجد نظام طلبات مرتبط بعد، لذلك لم يُرسَل أي شيء. يرجى الطلب عبر الهاتف أو إنستغرام.', eNet: 'تعذّر إرسال الطلب. لم يتم تسجيل أي شيء — حاول مجدداً.', busy: 'جارٍ إرسال طلبك…', ok: 'تم استلام الطلب', okT: 'شكراً لك. تم استلام طلبك.', ref: 'المرجع', home2: 'العودة إلى الكتب', lang: 'اللغة', sel: 'محدد' }
};
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s).normalize('NFD').replace(/[\u0300-\u036f\u064b-\u065f]/g, '').toLowerCase().trim();
const reduce = () => !!(matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches);
const sleep = ms => new Promise(r => setTimeout(r, ms));
const money = n => new Intl.NumberFormat(S.lang === 'ar' ? 'ar-DZ' : S.lang === 'fr' ? 'fr-DZ' : 'en-DZ').format(n) + ' ' + CFG.currency;
const S = { lang: localStorage.getItem('sos-lang') || 'en', key: null, qty: 1, name: '', phone: '', wil: null, com: null, method: '', addr: '', addrD: '', pick: '', busy: false, done: null, id: null, from: false };
try { S.lang = T[S.lang] ? S.lang : 'en'; } catch (e) { S.lang = 'en'; }
const t = k => T[S.lang][k];
const PHONE = /^(?:(?:\+|00)213|0)[567]\d{8}$/;
const phoneOk = v => PHONE.test(v.replace(/[\s.\-()]/g, ''));   // validation only — the stored value is never rewritten
const feeFor = (m, code) => { const f = CFG.deliveryFees && CFG.deliveryFees[m]; if (!f) return null; const v = f.byWilaya && f.byWilaya[code]; return v != null ? v : (f.default != null ? f.default : null); };
const blocked = (m, code) => !!(CFG.coverage && CFG.coverage[m] && (CFG.coverage[m].unavailableWilayas || []).includes(code));

/* ---------- styles ---------- */
const CSS = `
#sos-pv{position:fixed;inset:0;z-index:9000;overflow:auto;background:#050505;color:#F2F0EA;font-family:'Cormorant Garamond',Georgia,serif;-webkit-overflow-scrolling:touch}
#sos-pv[hidden]{display:none}
#sos-pv .bg{position:fixed;inset:0;pointer-events:none;z-index:0}
#sos-pv[data-b=one] .bg{background:radial-gradient(ellipse at 78% 20%,rgba(201,164,76,.16),transparent 55%),radial-gradient(ellipse at 0 100%,rgba(120,90,30,.22),transparent 50%),linear-gradient(160deg,#16130a,#070605 60%,#030303)}
#sos-pv[data-b=two] .bg{background:radial-gradient(ellipse at 50% 0,rgba(21,41,79,.55),transparent 55%),radial-gradient(ellipse at 50% 110%,rgba(201,164,76,.16),transparent 55%),linear-gradient(180deg,#0a1020,#05070d 70%,#030303)}
#sos-pv .wrap{position:relative;z-index:1;max-width:1180px;margin:0 auto;padding:20px clamp(16px,4vw,48px) 60px}
#sos-pv .top{display:flex;justify-content:space-between;align-items:center;gap:12px}
#sos-pv button,#sos-pv input{font:inherit;color:inherit}
.sp-btn{display:inline-flex;align-items:center;gap:10px;min-height:44px;padding:0 20px;border:1px solid #C9A44C;background:transparent;color:#C9A44C;font:600 12px/1 'Cinzel',serif;letter-spacing:.2em;text-transform:uppercase;cursor:pointer;transition:background .3s,color .3s}
.sp-btn:hover{background:#C9A44C;color:#080808}
.sp-btn:focus-visible,#sos-pv :focus-visible{outline:2px solid #E3C46D;outline-offset:3px}
.sp-lang{display:flex;gap:6px}.sp-lang button{min-width:44px;min-height:44px;border:1px solid rgba(201,164,76,.4);background:none;color:#D9D4C6;cursor:pointer;font:600 12px 'Cinzel',serif}
.sp-lang button[aria-pressed=true]{border-color:#E3C46D;color:#E3C46D;background:rgba(201,164,76,.12)}
#sos-pv h1{font:700 clamp(30px,4.4vw,52px)/1.15 'Cinzel','Reem Kufi',serif;margin:28px 0 6px;background:linear-gradient(180deg,#F3DE9C,#D6B25A 50%,#A8812B);-webkit-background-clip:text;background-clip:text;color:transparent}
[dir=rtl] #sos-pv h1,#sos-pv[dir=rtl] h1{font-family:'Reem Kufi','Cinzel',sans-serif}
#sos-pv .grid{display:grid;grid-template-columns:minmax(0,.9fr) minmax(0,1.3fr);gap:clamp(20px,4vw,52px);align-items:start;margin-top:18px}
@media(max-width:860px){#sos-pv .grid{grid-template-columns:1fr}}
.sp-card{border:1px solid rgba(201,164,76,.45);background:rgba(10,10,10,.72);padding:clamp(16px,2.6vw,30px);backdrop-filter:blur(4px)}
.sp-card h2{margin:0 0 14px;font:600 13px 'Cinzel',serif;letter-spacing:.26em;text-transform:uppercase;color:#C9A44C}
.sp-stage{perspective:1100px;display:grid;place-items:center;padding:18px 0 26px}
.sp-book{position:relative;transform-style:preserve-3d;transform:rotateY(-26deg) rotateX(4deg);transition:transform .6s cubic-bezier(.2,.7,.2,1)}
.sp-stage:hover .sp-book{transform:rotateY(-12deg) rotateX(2deg)}
.sp-book img{display:block;height:clamp(200px,32vh,300px);width:auto;box-shadow:0 24px 50px rgba(0,0,0,.7),0 0 40px rgba(201,164,76,.12)}
.sp-book::before{content:"";position:absolute;top:0;bottom:0;left:-14px;width:14px;background:linear-gradient(90deg,#3a2c0c,#8a6a24);transform:rotateY(-90deg);transform-origin:right}
.sp-book::after{content:"";position:absolute;top:2px;bottom:2px;right:-6px;width:12px;background:repeating-linear-gradient(0deg,#e9e0c8 0 2px,#bdb399 2px 3px);transform:rotateY(90deg);transform-origin:left}
.sp-row{display:flex;justify-content:space-between;gap:16px;padding:10px 0;border-top:1px solid rgba(201,164,76,.18);font-size:19px}
.sp-row b{font-weight:600;color:#E3C46D}.sp-row.tot{font-size:23px}
.sp-ph{color:#B7A878;font-style:italic;font-size:16px}
.sp-q{display:inline-flex;align-items:center;border:1px solid rgba(201,164,76,.5)}
.sp-q button{width:44px;height:44px;background:none;border:0;color:#E3C46D;font-size:22px;cursor:pointer}.sp-q span{min-width:36px;text-align:center;font-size:20px}
.sp-f{margin-bottom:18px;position:relative}
.sp-f label,.sp-f legend{display:block;margin-bottom:6px;font:600 12px 'Cinzel','Reem Kufi',serif;letter-spacing:.18em;text-transform:uppercase;color:#D9D4C6;padding:0}
[dir=rtl] .sp-f label,[dir=rtl] .sp-f legend{letter-spacing:0;font-size:15px}
.sp-in{width:100%;min-height:50px;padding:10px 14px;background:rgba(255,255,255,.04);border:1px solid rgba(201,164,76,.35);border-radius:0;font-size:20px;transition:border-color .25s,box-shadow .25s,background .25s}
.sp-in:focus{outline:0;border-color:#E3C46D;box-shadow:0 0 0 3px rgba(227,196,109,.18);background:rgba(255,255,255,.07)}
.sp-in[aria-invalid=true]{border-color:#e0705e}.sp-in:disabled{opacity:.5}
.sp-h{font-size:15px;color:#A9A395;margin-top:4px}
.sp-e{color:#ff9a88;font-size:16px;margin-top:5px;min-height:0}
.sp-l{position:absolute;inset-inline:0;top:100%;z-index:20;margin:2px 0 0;padding:0;list-style:none;max-height:260px;overflow:auto;background:#0d0d0d;border:1px solid #C9A44C;box-shadow:0 18px 40px rgba(0,0,0,.7)}
.sp-l li{padding:12px 14px;font-size:19px;cursor:pointer;display:flex;justify-content:space-between;gap:10px}
.sp-l li[aria-selected=true],.sp-l li:hover{background:rgba(201,164,76,.2)}.sp-l li small{color:#A9A395;font-size:15px}
.sp-dm{display:grid;grid-template-columns:1fr 1fr;gap:14px;border:0;padding:0;margin:0 0 8px}
@media(max-width:560px){.sp-dm{grid-template-columns:1fr}}
.sp-d{position:relative;display:block;min-height:116px;padding:18px;border:1px solid rgba(201,164,76,.3);background:rgba(255,255,255,.025);cursor:pointer;transition:border-color .3s,background .3s}
.sp-d:hover{border-color:rgba(227,196,109,.7)}.sp-d input{position:absolute;opacity:0;inset:0;margin:0;cursor:pointer}
.sp-d:has(input:focus-visible){outline:2px solid #E3C46D;outline-offset:3px}
.sp-d:has(input:checked){border-color:#E3C46D;background:rgba(201,164,76,.12);box-shadow:inset 0 0 0 1px rgba(227,196,109,.4)}
.sp-d .ic{width:38px;height:38px;color:#C9A44C;margin-bottom:10px}.sp-d b{display:block;font:600 19px/1.25 'Cormorant Garamond','Reem Kufi',serif}
.sp-sw{position:absolute;top:12px;inset-inline-end:12px;width:42px;height:42px;opacity:0;color:#E3C46D}
.sp-d:has(input:checked) .sp-sw{opacity:1}.sp-sw path{stroke-dasharray:60;stroke-dashoffset:60}
.sp-d:has(input:checked) .sp-sw{animation:sw-pop .5s cubic-bezier(.2,.9,.2,1.3)}
.sp-d:has(input:checked) .sp-sw path{animation:sw-draw .5s .05s ease forwards}
.sp-d .st{display:none;margin-top:8px;font:600 11px 'Cinzel',serif;letter-spacing:.2em;color:#E3C46D;text-transform:uppercase}.sp-d:has(input:checked) .st{display:block}
@keyframes sw-draw{to{stroke-dashoffset:0}}@keyframes sw-pop{from{transform:scale(.4) rotate(-40deg)}to{transform:none}}
.sp-sub{width:100%;min-height:58px;margin-top:10px;background:linear-gradient(180deg,#E3C46D,#C9A44C);color:#080808;border:0;font:700 14px 'Cinzel','Reem Kufi',serif;letter-spacing:.24em;cursor:pointer;position:relative;overflow:hidden}
[dir=rtl] .sp-sub{letter-spacing:.05em;font-size:18px}.sp-sub:disabled{opacity:.7;cursor:wait}
.sp-sub .sp{display:none;width:18px;height:18px;border:2px solid #080808;border-top-color:transparent;border-radius:50%;vertical-align:-3px;margin-inline-end:10px;animation:sp-s .8s linear infinite}.sp-sub.ld .sp{display:inline-block}
@keyframes sp-s{to{transform:rotate(360deg)}}
.sp-st{margin-top:14px;padding:14px;border:1px solid #e0705e;color:#ffb4a6;font-size:18px;background:rgba(224,112,94,.08)}
.sp-st a{color:#E3C46D}
.sp-ok{text-align:center;padding:50px 10px}.sp-ok svg{width:120px;color:#E3C46D}
/* entrance */
#sos-pv.in .sp-stage,#sos-pv.in .sp-f,#sos-pv.in .sp-card>h2,#sos-pv.in .sp-row,#sos-pv.in h1{animation:sp-up .7s cubic-bezier(.2,.7,.2,1) both;animation-delay:calc(var(--i,0)*70ms + .1s)}
#sos-pv.in[data-b=two] .sp-book{animation:sp-3d 1.3s .15s cubic-bezier(.16,.8,.2,1) both}
#sos-pv.in[data-b=one] .sp-book{animation:sp-3d1 1s .15s cubic-bezier(.16,.8,.2,1) both}
@keyframes sp-up{from{opacity:0;transform:translateY(22px)}to{opacity:1;transform:none}}
@keyframes sp-3d{from{opacity:0;transform:translateZ(-260px) rotateY(-80deg) rotateX(14deg)}to{opacity:1}}
@keyframes sp-3d1{from{opacity:0;transform:translateX(-90px) rotateY(-70deg)}to{opacity:1}}
#sos-pv .sweep{position:fixed;inset:0;pointer-events:none;z-index:3;background:linear-gradient(105deg,transparent 35%,rgba(255,236,170,.22) 50%,transparent 65%);transform:translateX(-120%)}
#sos-pv.in .sweep{animation:sp-sw 1.1s .25s ease forwards}@keyframes sp-sw{to{transform:translateX(120%)}}
/* transitions */
#sos-fx{position:fixed;inset:0;z-index:9500;overflow:hidden;pointer-events:all;perspective:1400px}
#sos-fx .dk{position:absolute;inset:0;background:#030303;opacity:0}
.ax{position:absolute;top:0;bottom:0;width:50.5%;will-change:transform;background:linear-gradient(90deg,#08090b,#15181d 60%,#0b0c0e)}
.ax.l{left:0;transform-origin:left center}.ax.r{right:0;transform-origin:right center;background:linear-gradient(270deg,#08090b,#15181d 60%,#0b0c0e)}
.ax svg{position:absolute;top:50%;width:min(125vw,1500px);height:auto;transform:translateY(-50%);overflow:visible;filter:drop-shadow(0 20px 30px #000)}
.ax.l svg{right:-8%}.ax.r svg{left:-8%;transform:translateY(-50%) scaleX(-1)}
#sos-fx .seam{position:absolute;top:0;bottom:0;left:50%;width:2px;margin-left:-1px;background:linear-gradient(180deg,transparent,#F3DE9C 30%,#F3DE9C 70%,transparent);box-shadow:0 0 30px 6px rgba(227,196,109,.7);opacity:0}
.rg-sc{position:absolute;inset:0;background:linear-gradient(180deg,#0b1222,#04060b 75%);opacity:0}
.rg-sc svg{position:absolute;left:0;bottom:0;width:100%;height:68%;opacity:.95}
.rg-lt{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 55%,#ffe7a0 0,#d9a93e 22%,rgba(150,100,20,.55) 48%,transparent 75%);opacity:0}
.gp{position:absolute;top:0;bottom:0;width:50.4%;will-change:transform;background:repeating-linear-gradient(90deg,rgba(0,0,0,.35) 0 2px,transparent 2px 54px),linear-gradient(180deg,#2a2b2e,#141517 55%,#0c0c0d);border:1px solid #6e5a2a}
.gp.l{left:0;border-inline-end:2px solid #C9A44C}.gp.r{right:0;border-inline-start:2px solid #C9A44C}
.gp::before,.gp::after{content:"";position:absolute;left:6%;right:6%;height:14px;background:linear-gradient(180deg,#6f5a26,#C9A44C 50%,#6f5a26);box-shadow:0 0 0 1px #000}
.gp::before{top:22%}.gp::after{bottom:22%}
.gp i{position:absolute;top:50%;width:46px;height:46px;border-radius:50%;margin-top:-23px;border:4px solid #A8812B;background:radial-gradient(circle,#0c0c0d 40%,#8a6a24 41%)}
.gp.l i{right:7%}.gp.r i{left:7%}
@media(prefers-reduced-motion:reduce){#sos-pv.in *{animation-duration:.01s!important;animation-delay:0s!important}}
`;

/* ---------- transitions (WAAPI, ~2.2s each) ---------- */
const E = { io: 'cubic-bezier(.7,0,.25,1)', out: 'cubic-bezier(.16,.8,.2,1)' };
const an = (el, kf, o) => el.animate(kf, { fill: 'forwards', ...o }).finished;
const AXE = `<svg viewBox="0 0 900 360" aria-hidden="true"><defs><linearGradient id="st" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8d949c"/><stop offset=".5" stop-color="#3a3f46"/><stop offset="1" stop-color="#15171a"/></linearGradient><linearGradient id="wd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a3a1c"/><stop offset=".5" stop-color="#241b0c"/><stop offset="1" stop-color="#0d0a05"/></linearGradient></defs>
<rect x="0" y="162" width="640" height="36" rx="6" fill="url(#wd)"/><rect x="120" y="156" width="14" height="48" fill="#C9A44C"/><rect x="150" y="156" width="6" height="48" fill="#C9A44C" opacity=".7"/><rect x="540" y="152" width="22" height="56" fill="#A8812B"/>
<path d="M560 180 L575 70 Q650 8 760 30 Q720 98 748 180 Q720 262 760 330 Q650 352 575 290 Z" fill="url(#st)" stroke="#C9A44C" stroke-width="3"/><path d="M592 180 L600 96 Q660 60 726 66 Q700 120 716 180 Q700 240 726 294 Q660 300 600 264 Z" fill="none" stroke="rgba(243,222,156,.55)" stroke-width="2"/><path d="M570 180 H648" stroke="#C9A44C" stroke-width="3"/><path d="M900 180" /></svg>`;
async function axeGate(mid) {
  const fx = $('#sos-fx');
  fx.innerHTML = `<div class="dk"></div><div class="ax l">${AXE}</div><div class="ax r">${AXE}</div><div class="seam"></div>`;
  const [dk, l, r, seam] = [...fx.children];
  l.style.transform = 'translateX(-102%)'; r.style.transform = 'translateX(102%)';
  await an(dk, [{ opacity: 0 }, { opacity: .88 }], { duration: 260 });
  await Promise.all([an(l, [{ transform: 'translateX(-102%) rotateY(10deg)' }, { transform: 'translateX(0) rotateY(0)' }], { duration: 620, easing: E.io }), an(r, [{ transform: 'translateX(102%) rotateY(-10deg)' }, { transform: 'translateX(0) rotateY(0)' }], { duration: 620, easing: E.io })]);
  an(seam, [{ opacity: 0 }, { opacity: 1 }, { opacity: .6 }], { duration: 400 });
  an(fx, [{ transform: 'translate(0,0)' }, { transform: 'translate(-5px,3px)' }, { transform: 'translate(4px,-2px)' }, { transform: 'none' }], { duration: 220, fill: 'none' });
  mid(); await sleep(340);
  an(seam, [{ opacity: .6 }, { opacity: 0 }], { duration: 300 });
  an(dk, [{ opacity: .88 }, { opacity: 0 }], { duration: 650, delay: 150 });
  await Promise.all([an(l, [{ transform: 'translateX(0)' }, { transform: 'translateX(-104%) rotateY(8deg)' }], { duration: 700, easing: E.io }), an(r, [{ transform: 'translateX(0)' }, { transform: 'translateX(104%) rotateY(-8deg)' }], { duration: 700, easing: E.io })]);
}
const PINES = [[20, 160, 60], [70, 130, 80], [130, 175, 55], [1130, 150, 70], [1190, 120, 85], [1060, 175, 55], [250, 190, 40], [940, 190, 40]].map(([x, y, w]) => `<use href="#pine" x="${x}" y="${y}" width="${w}" height="${w * 2}"/>`).join('');
async function royalGate(mid) {
  const fx = $('#sos-fx');
  const hasCastle = !!document.getElementById('castle');
  fx.innerHTML = `<div class="rg-sc"><svg viewBox="0 0 1200 400" preserveAspectRatio="xMidYMax slice" fill="#05070c" aria-hidden="true">${hasCastle ? '<use href="#castle" x="260" y="0" width="680" height="400"/>' : '<path d="M300 400V200h40v-40h40v40h60v-90h50v90h60v-60h40v60h60v-90h50v90h60v200z"/>'}${PINES}</svg></div><div class="rg-lt"></div><div class="gp l"><i></i></div><div class="gp r"><i></i></div><div class="seam"></div>`;
  const [sc, lt, l, r, seam] = [...fx.children];
  l.style.transform = 'translateX(-102%)'; r.style.transform = 'translateX(102%)';
  await an(sc, [{ opacity: 0 }, { opacity: 1 }], { duration: 420 });
  await Promise.all([an(sc.firstChild, [{ transform: 'translateY(40px)' }, { transform: 'none' }], { duration: 420, fill: 'none' }), an(l, [{ transform: 'translateX(-102%)' }, { transform: 'translateX(0)' }], { duration: 560, easing: E.out, delay: 120 }), an(r, [{ transform: 'translateX(102%)' }, { transform: 'translateX(0)' }], { duration: 560, easing: E.out, delay: 120 })]);
  await an(seam, [{ opacity: 0 }, { opacity: 1 }], { duration: 320 });
  mid(); await sleep(120);
  an(lt, [{ opacity: 0 }, { opacity: 1 }], { duration: 500 });
  an(seam, [{ opacity: 1 }, { opacity: 0 }], { duration: 500 });
  await Promise.all([an(l, [{ transform: 'translateX(0)' }, { transform: 'translateX(-104%)' }], { duration: 850, easing: E.io }), an(r, [{ transform: 'translateX(0)' }, { transform: 'translateX(104%)' }], { duration: 850, easing: E.io })]);
  an(sc, [{ opacity: 1 }, { opacity: 0 }], { duration: 400 });
  await an(lt, [{ opacity: 1 }, { opacity: 0 }], { duration: 480 });
}

/* ---------- combobox ---------- */
function combo(root, o) {
  const inp = $('input', root), list = $('ul', root);
  let items = [], act = -1;
  const label = o.label;
  const open = () => { list.hidden = false; inp.setAttribute('aria-expanded', 'true'); };
  const close = () => { list.hidden = true; inp.setAttribute('aria-expanded', 'false'); act = -1; };
  const draw = q => {
    const n = norm(q || ''); const all = o.options();
    items = n ? all.filter(x => norm(x.search).includes(n)) : all;
    list.innerHTML = items.length ? items.map((x, i) => `<li role="option" id="${list.id}-${i}" data-i="${i}" aria-selected="${i === act}">${x.html}</li>`).join('') : `<li role="option" aria-disabled="true">${esc(t('none'))}</li>`;
  };
  const choose = i => { const x = items[i]; if (!x) return; o.pick(x.value); inp.value = label(x.value); close(); };
  const mark = () => { [...list.children].forEach((li, i) => li.setAttribute('aria-selected', i === act)); const li = list.children[act]; if (li) { li.scrollIntoView({ block: 'nearest' }); inp.setAttribute('aria-activedescendant', li.id); } };
  inp.addEventListener('focus', () => { inp.select(); draw(''); open(); });
  inp.addEventListener('click', () => { if (list.hidden) { draw(''); open(); } });
  inp.addEventListener('input', () => { act = 0; draw(inp.value); open(); mark(); });
  inp.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown') { e.preventDefault(); if (list.hidden) { draw(''); open(); } act = Math.min(items.length - 1, act + 1); mark(); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); act = Math.max(0, act - 1); mark(); }
    else if (e.key === 'Enter' && !list.hidden) { e.preventDefault(); choose(act < 0 ? 0 : act); }
    else if (e.key === 'Escape' && !list.hidden) { e.stopPropagation(); close(); }
  });
  list.addEventListener('mousedown', e => { e.preventDefault(); const li = e.target.closest('li[data-i]'); if (li) choose(+li.dataset.i); });
  inp.addEventListener('blur', () => { close(); inp.value = o.current() ? label(o.current()) : ''; });
}

/* ---------- view ---------- */
const wLabel = w => w[0] + ' — ' + (S.lang === 'ar' ? w[2] : w[1]);
const cLabel = c => (S.lang === 'ar' ? c[1] : c[0]);
function coverSrc(p) { const i = $(p.img); return i ? i.currentSrc || i.src : ''; }
function totals() {
  const p = CFG.products[S.key], unit = p.price, fee = S.method && S.wil ? feeFor(S.method, S.wil[0]) : null;
  return { unit, fee, total: unit == null ? null : unit * S.qty + (fee || 0) };
}
function render() {
  const v = $('#sos-pv'), p = CFG.products[S.key], L = S.lang;
  v.dir = L === 'ar' ? 'rtl' : 'ltr'; v.lang = L; v.dataset.b = S.key;
  const cov = ['office', 'home'].map(m => `<label class="sp-d" style="--i:${m === 'home' ? 1 : 0}"><input type="radio" name="dm" value="${m}" ${S.method === m ? 'checked' : ''}>
    <svg class="ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true">${m === 'office' ? '<path d="M4 21V8l8-5 8 5v13M9 21v-6h6v6M4 21h16"/>' : '<path d="M3 11l9-8 9 8M5 10v11h14V10M10 21v-6h4v6"/>'}</svg>
    <b>${esc(t(m))}</b><span class="st">✓ ${esc(t('sel'))}</span>
    <svg class="sp-sw" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" aria-hidden="true"><path d="M8 8l26 26M34 34l5 5M30 38l8-8M40 8L14 34M14 34l-5 5M10 30l8 8"/></svg></label>`).join('');
  v.innerHTML = `<div class="bg"></div><div class="sweep"></div><div class="wrap">
  <div class="top"><button class="sp-btn" id="sp-back" type="button">${L === 'ar' ? '→' : '←'} ${esc(t('back'))}</button>
  <div class="sp-lang" role="group" aria-label="${esc(t('lang'))}">${['en', 'fr', 'ar'].map(k => `<button type="button" data-l="${k}" aria-pressed="${k === L}" lang="${k}">${k === 'ar' ? 'ع' : k.toUpperCase()}</button>`).join('')}</div></div>
  <h1 id="sp-h">${esc(t('h'))}</h1>
  <div class="grid"><aside class="sp-card" aria-label="${esc(t('sum'))}"><h2>${esc(t('sum'))}</h2>
    <div class="sp-stage"><div class="sp-book"><img src="${esc(coverSrc(p))}" alt="${esc(p.title[L])}"></div></div>
    <div class="sp-row"><span>${esc(p.title[L])}</span></div>
    <div class="sp-row"><span>${esc(t('unit'))}</span><b id="sp-u"></b></div>
    <div class="sp-row"><span id="sp-ql">${esc(t('qty'))}</span><div class="sp-q" role="group" aria-labelledby="sp-ql"><button type="button" id="sp-m" aria-label="−">−</button><span id="sp-n" aria-live="polite">${S.qty}</span><button type="button" id="sp-p" aria-label="+">+</button></div></div>
    <div class="sp-row"><span>${esc(t('fee'))}</span><b id="sp-f"></b></div>
    <div class="sp-row tot"><span>${esc(t('total'))}</span><b id="sp-t"></b></div></aside>
  <form class="sp-card" id="sp-form" novalidate aria-labelledby="sp-h"><h2>${esc(t('meth').length ? '' : '')}${esc(p.title[L])}</h2>
    <div class="sp-f" style="--i:1"><label for="sp-name">${esc(t('name'))} *</label><input class="sp-in" id="sp-name" name="name" autocomplete="name" value="${esc(S.name)}" aria-describedby="e-name"><div class="sp-e" id="e-name" role="alert"></div></div>
    <div class="sp-f" style="--i:2"><label for="sp-phone">${esc(t('phone'))} *</label><input class="sp-in" id="sp-phone" name="phone" type="tel" inputmode="tel" autocomplete="tel" dir="ltr" value="${esc(S.phone)}" aria-describedby="h-phone e-phone" style="text-align:start"><div class="sp-h" id="h-phone">${esc(t('phoneH'))}</div><div class="sp-e" id="e-phone" role="alert"></div></div>
    <div class="sp-f" style="--i:3" id="cb-w"><label for="sp-wil">${esc(t('wil'))} *</label><input class="sp-in" id="sp-wil" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="sp-wl" autocomplete="off" placeholder="${esc(t('search'))}" value="${S.wil ? esc(wLabel(S.wil)) : ''}" aria-describedby="e-wil"><ul class="sp-l" id="sp-wl" role="listbox" hidden></ul><div class="sp-e" id="e-wil" role="alert"></div></div>
    <div class="sp-f" style="--i:4" id="cb-c"><label for="sp-com">${esc(t('com'))} *</label><input class="sp-in" id="sp-com" role="combobox" aria-autocomplete="list" aria-expanded="false" aria-controls="sp-cl" autocomplete="off" ${S.wil ? '' : 'disabled'} placeholder="${esc(S.wil ? t('search') : t('comFirst'))}" value="${S.com ? esc(cLabel(S.com)) : ''}" aria-describedby="e-com"><ul class="sp-l" id="sp-cl" role="listbox" hidden></ul><div class="sp-e" id="e-com" role="alert"></div></div>
    <div class="sp-f" style="--i:5"><fieldset class="sp-dm" role="radiogroup" aria-describedby="e-method" aria-required="true"><legend style="grid-column:1/-1">${esc(t('meth'))} *</legend>${cov}</fieldset><div class="sp-e" id="e-method" role="alert"></div></div>
    <div id="sp-cond"></div>
    <button class="sp-sub" id="sp-go" type="submit"><span class="sp"></span><span id="sp-gl">${esc(t('confirm'))}</span></button>
    <div id="sp-status" role="status" aria-live="polite"></div></form></div></div>`;
  condFields(); money_(); wire(v);
}
function condFields() {
  const c = $('#sp-cond'); if (!c) return;
  c.innerHTML = S.method === 'home'
    ? `<div class="sp-f"><label for="sp-addr">${esc(t('addr'))} *</label><input class="sp-in" id="sp-addr" autocomplete="street-address" value="${esc(S.addr)}" aria-describedby="e-addr"><div class="sp-e" id="e-addr" role="alert"></div></div><div class="sp-f"><label for="sp-addrd">${esc(t('addrD'))}</label><input class="sp-in" id="sp-addrd" value="${esc(S.addrD)}"></div>`
    : S.method === 'office' ? `<div class="sp-f"><label for="sp-pick">${esc(t('pick'))} *</label><input class="sp-in" id="sp-pick" value="${esc(S.pick)}" aria-describedby="h-pick e-pick"><div class="sp-h" id="h-pick">${esc(t('pickH'))}</div><div class="sp-e" id="e-pick" role="alert"></div></div>` : '';
  c.style.animation = 'sp-up .4s ease both';
  $('#sp-addr') && $('#sp-addr').addEventListener('input', e => S.addr = e.target.value);
  $('#sp-addrd') && $('#sp-addrd').addEventListener('input', e => S.addrD = e.target.value);
  $('#sp-pick') && $('#sp-pick').addEventListener('input', e => S.pick = e.target.value);
}
function money_() {
  const { unit, fee, total } = totals();
  const ph = (k) => `<span class="sp-ph">${esc(t(k))}</span>`;
  $('#sp-u').innerHTML = unit == null ? ph('tbd') : esc(money(unit));
  $('#sp-f').innerHTML = !S.method || !S.wil ? ph('feeAt') : fee == null ? ph('feeNc') : esc(money(fee));
  $('#sp-t').innerHTML = total == null ? ph('nc') : esc(money(total));
  $('#sp-n').textContent = S.qty;
}
function err(id, msg) { const e = $('#e-' + id), i = e && e.previousElementSibling && e.parentElement.querySelector('input.sp-in'); if (e) e.textContent = msg || ''; document.querySelectorAll('#e-' + id).forEach(() => { }); const inp = $({ name: '#sp-name', phone: '#sp-phone', wil: '#sp-wil', com: '#sp-com', addr: '#sp-addr', pick: '#sp-pick' }[id] || '#none'); if (inp) { msg ? inp.setAttribute('aria-invalid', 'true') : inp.removeAttribute('aria-invalid'); } }
function validate() {
  const e = {};
  if (!S.name.trim()) e.name = t('eReq');
  if (!S.phone.trim()) e.phone = t('eReq'); else if (!phoneOk(S.phone)) e.phone = t('ePhone');
  if (!S.wil) e.wil = t('eSel');
  if (!S.com) e.com = t('eSel');
  if (!S.method) e.method = t('eMeth'); else if (S.wil && blocked(S.method, S.wil[0])) e.method = t('eCov');
  else if (S.method === 'home' && !S.addr.trim()) e.addr = t('eReq');
  else if (S.method === 'office' && !S.pick.trim()) e.pick = t('eReq');
  ['name', 'phone', 'wil', 'com', 'method', 'addr', 'pick'].forEach(k => err(k, e[k]));
  const first = Object.keys(e)[0]; if (first) { const el = { name: '#sp-name', phone: '#sp-phone', wil: '#sp-wil', com: '#sp-com', method: '.sp-d input', addr: '#sp-addr', pick: '#sp-pick' }[first]; $(el) && $(el).focus(); }
  return !first;
}
function wire(v) {
  $('#sp-back').onclick = back;
  v.querySelectorAll('[data-l]').forEach(b => b.onclick = () => { S.lang = b.dataset.l; try { localStorage.setItem('sos-lang', S.lang); } catch (e) { } render(); v.classList.remove('in'); });
  $('#sp-name').oninput = e => { S.name = e.target.value; };
  $('#sp-phone').oninput = e => { S.phone = e.target.value; };   // stored verbatim
  $('#sp-m').onclick = () => { S.qty = Math.max(1, S.qty - 1); money_(); };
  $('#sp-p').onclick = () => { S.qty = Math.min(20, S.qty + 1); money_(); };
  combo($('#cb-w'), { label: wLabel, current: () => S.wil, options: () => DZ.w.map(w => ({ value: w, search: w.join(' '), html: `<span>${esc(wLabel(w))}</span>` })), pick: w => { if (!S.wil || S.wil[0] !== w[0]) { S.wil = w; S.com = null; const c = $('#sp-com'); c.disabled = false; c.value = ''; c.placeholder = t('search'); } err('wil'); money_(); } });
  combo($('#cb-c'), { label: cLabel, current: () => S.com, options: () => (S.wil ? DZ.c[S.wil[0]] || [] : []).map(c => ({ value: c, search: c[0] + ' ' + c[1], html: `<span>${esc(cLabel(c))}</span><small>${esc(S.lang === 'ar' ? '' : c[2])}</small>` })), pick: c => { S.com = c; err('com'); } });
  v.querySelectorAll('input[name=dm]').forEach(r => r.onchange = () => { S.method = r.value; err('method', S.wil && blocked(S.method, S.wil[0]) ? t('eCov') : ''); condFields(); money_(); });
  $('#sp-form').onsubmit = submit;
}
async function submit(ev) {
  ev.preventDefault(); if (S.busy) return;
  const st = $('#sp-status'); st.innerHTML = '';
  if (!validate()) return;
  if (!CFG.orderEndpoint) { st.innerHTML = `<div class="sp-st">${esc(t('eNone'))}<br><a href="tel:${CFG.contactPhone}">${esc(CFG.contactDisplay)}</a></div>`; return; }
  const p = CFG.products[S.key], tt = totals();
  const order = { idempotencyKey: S.id || (S.id = (crypto.randomUUID ? crypto.randomUUID() : String(Date.now()) + Math.random())), product: S.key === 'one' ? 'part-one' : 'part-two', quantity: S.qty,
    customer: { fullName: S.name.trim(), phone: S.phone.trim() }, wilaya: { code: S.wil[0], name: S.wil[1] }, commune: { name: S.com[0], nameAr: S.com[1], daira: S.com[2] },
    delivery: { method: S.method, ...(S.method === 'home' ? { address: S.addr.trim(), details: S.addrD.trim() } : { pickupOffice: S.pick.trim() }) },
    pricing: { currency: CFG.currency, unitPrice: tt.unit, deliveryFee: tt.fee, total: tt.total }, locale: S.lang };
  S.busy = true; const b = $('#sp-go'); b.disabled = true; b.classList.add('ld'); $('#sp-gl').textContent = t('busy');
  try {
    const r = await fetch(CFG.orderEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(order) });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    let j = {}; try { j = await r.json(); } catch (e) { }
    S.done = j.reference || j.id || ''; confirmView();
  } catch (e) { st.innerHTML = `<div class="sp-st">${esc(t('eNet'))}</div>`; b.disabled = false; b.classList.remove('ld'); $('#sp-gl').textContent = t('confirm'); }
  finally { S.busy = false; }
}
function confirmView() {
  $('#sos-pv .grid').innerHTML = `<div class="sp-card sp-ok" style="grid-column:1/-1"><svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><circle cx="24" cy="24" r="20"/><path d="M14 25l7 7 13-15"/></svg><h2 style="font-size:20px">${esc(t('ok'))}</h2><p style="font-size:22px">${esc(t('okT'))}</p>${S.done ? `<p>${esc(t('ref'))}: <b>${esc(S.done)}</b></p>` : ''}<button class="sp-btn" type="button" id="sp-home">${esc(t('home2'))}</button></div>`;
  $('#sp-home').onclick = () => { reset(); back(); }; $('#sp-home').focus();
}
function reset() { Object.assign(S, { qty: 1, name: '', phone: '', wil: null, com: null, method: '', addr: '', addrD: '', pick: '', busy: false, done: null, id: null }); }

/* ---------- routing ---------- */
const keyOf = h => { const m = /^#\/order\/(part-one|part-two)$/.exec(h); return m ? (m[1] === 'part-one' ? 'one' : 'two') : null; };
let prevFocus = null, busy = false;
function ensureDom() {
  if (!$('#sos-css')) { const s = document.createElement('style'); s.id = 'sos-css'; s.textContent = CSS; document.head.appendChild(s); }
  if (!$('#sos-pv')) { const d = document.createElement('div'); d.id = 'sos-pv'; d.hidden = true; d.setAttribute('role', 'dialog'); d.setAttribute('aria-modal', 'true'); d.setAttribute('aria-label', 'Order'); document.body.appendChild(d); }
  if (!$('#sos-fx')) { const f = document.createElement('div'); f.id = 'sos-fx'; f.hidden = true; f.setAttribute('aria-hidden', 'true'); document.body.appendChild(f); }
}
function showView(key) {
  ensureDom(); const v = $('#sos-pv');
  if (S.key !== key) { reset(); } S.key = key; render();
  v.hidden = false; document.documentElement.style.overflow = 'hidden'; v.scrollTop = 0;
  document.title = CFG.products[key].title.en + ' — Order';
  void v.offsetWidth; v.classList.add('in'); const h = $('#sp-h'); h && h.setAttribute('tabindex', '-1'); h && h.focus({ preventScroll: true });
}
function hideView() { const v = $('#sos-pv'); if (v) { v.hidden = true; v.classList.remove('in'); } document.documentElement.style.overflow = ''; document.title = 'Sword of the Sky — Books'; if (prevFocus && prevFocus.focus) prevFocus.focus({ preventScroll: true }); }
function back() { if (S.from) { S.from = false; history.back(); } else { location.hash = ''; } }
async function openOrder(key) {
  if (busy) return; busy = true; ensureDom();
  const fx = $('#sos-fx'); let shown = false;
  const mid = () => { if (!shown) { shown = true; S.from = true; location.hash = '#/order/' + CFG.products[key].slug; } };
  try {
    if (reduce()) { mid(); } else { fx.hidden = false; await (key === 'one' ? axeGate : royalGate)(mid); }
  } catch (e) { console.warn('transition failed; showing order page directly', e); }
  finally { mid(); fx.hidden = true; fx.innerHTML = ''; busy = false; }
}
document.addEventListener('click', e => {
  const a = e.target.closest && e.target.closest('a[data-buy]'); if (!a) return;
  e.preventDefault(); e.stopPropagation(); prevFocus = a; openOrder(a.dataset.buy);
}, true);
addEventListener('hashchange', () => { const k = keyOf(location.hash); if (k) { if (!busy || !$('#sos-pv') || $('#sos-pv').hidden) showView(k); } else hideView(); });
addEventListener('keydown', e => { if (e.key === 'Escape' && $('#sos-pv') && !$('#sos-pv').hidden && !e.defaultPrevented) back(); });
const boot = () => { const k = keyOf(location.hash); if (k) showView(k); };
document.readyState === 'loading' ? addEventListener('DOMContentLoaded', () => setTimeout(boot, 400)) : setTimeout(boot, 400);
window.SOS_ORDER = { CFG, open: openOrder };
})();
