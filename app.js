// -------------------- THEME + NAV DATA --------------------
const THEMES = {
  tech:   { g1: getCss('--a1'), g2: getCss('--a2'), logo: { root: 'logo/ediz.png',   page: '../logo/ediz.png' } },
  design: { g1: getCss('--b1'), g2: getCss('--b2'), logo: { root: 'logo/design.png', page: '../logo/design.png' } },
  lab:    { g1: getCss('--c1'), g2: getCss('--c2'), logo: { root: 'logo/lab.png',    page: '../logo/lab.png' } },
};

const SERVICES = {
  tech: [
    { label: 'AR-GE ve Mühendislik', hrefRoot: 'pages/tech-arge.html',      hrefPage: 'tech-arge.html' },
    { label: 'Akıllı Ev ve Güvenlik Sistemleri', hrefRoot: 'pages/tech-smarthome.html', hrefPage: 'tech-smarthome.html' },
    { label: 'Enerji Sistemleri', hrefRoot: 'pages/tech-energy.html',      hrefPage: 'tech-energy.html' },
    { label: 'Ürünlerimiz', hrefRoot: 'pages/tech-products.html',          hrefPage: 'tech-products.html' },
    { label: 'Projelerimiz', hrefRoot: 'pages/tech-projects.html',         hrefPage: 'tech-projects.html' },
  ],
  design: [
    { label: 'Duvar Dekorları / Aydınlatmaları', hrefRoot: 'pages/design-wall.html',     hrefPage: 'design-wall.html' },
    { label: 'Işıklı Tablolar', hrefRoot: 'pages/design-lightbox.html',                 hrefPage: 'design-lightbox.html' },
    { label: 'İslami İşlemeli Tablolar', hrefRoot: 'pages/design-islamic.html',         hrefPage: 'design-islamic.html' },
    { label: 'Oyunlar (Tavla / Satranç vb.)', hrefRoot: 'pages/design-games.html',      hrefPage: 'design-games.html' },
    { label: 'Reklam Tabelaları', hrefRoot: 'pages/design-signage.html',                hrefPage: 'design-signage.html' },
    { label: 'Lazer/CNC/3D Baskı Fason', hrefRoot: 'pages/design-fason.html',           hrefPage: 'design-fason.html' },
  ],
  lab: [
    { label: 'Akıllı Ev (Smart Home) Kitleri', hrefRoot: 'pages/lab-smarthome-kits.html', hrefPage: 'lab-smarthome-kits.html' },
    { label: 'IoT ve ESP32 tabanlı proje kitleri', hrefRoot: 'pages/lab-iot-esp32.html',  hrefPage: 'lab-iot-esp32.html' },
    { label: 'Yenilenebilir enerji eğitim setleri', hrefRoot: 'pages/lab-renewable.html', hrefPage: 'lab-renewable.html' },
    { label: 'MDF tabanlı montajlı STEM maket kitleri', hrefRoot: 'pages/lab-mdf-stem.html', hrefPage: 'lab-mdf-stem.html' },
    { label: 'Okullara özel laboratuvar deney setleri', hrefRoot: 'pages/lab-schools.html', hrefPage: 'lab-schools.html' },
  ],
};

// -------------------- HELPERS --------------------
function getCss(name){
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function isPage(){
  return window.location.pathname.includes('/pages/') || window.location.href.includes('/pages/');
}
function setTheme(key){
  const t = THEMES[key];

  document.documentElement.style.setProperty('--g1', t.g1);
  document.documentElement.style.setProperty('--g2', t.g2);

  const logoEl = document.getElementById('brandLogo');
  if (logoEl){
    logoEl.src = isPage() ? t.logo.page : t.logo.root;
    logoEl.alt = key === 'tech' ? 'Ediz Teknoloji' : key === 'design' ? 'Ediz Design' : 'EdizLab';
  }

  document.querySelectorAll('.catTab').forEach(btn=>{
    const active = btn.dataset.theme === key;
    btn.setAttribute('aria-selected', active ? 'true' : 'false');
  });

  buildServicesDropdown(key);
}

function buildServicesDropdown(key){
  const panel = document.getElementById('servicesPanel');
  if (!panel) return;

  panel.innerHTML = '';
  const list = SERVICES[key] || [];

  list.forEach(item=>{
    const a = document.createElement('a');
    a.className = 'ddItem';
    a.href = isPage() ? item.hrefPage : item.hrefRoot;
    a.innerHTML = `<span>${item.label}</span><span class="arrow">→</span>`;
    panel.appendChild(a);
  });
}

function closeDropdown(){
  document.querySelectorAll('.dd').forEach(d=>d.classList.remove('open'));
}

function setYear(){
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
}

function setText(id, v){
  const el = document.getElementById(id);
  if (el) el.textContent = v;
}

// -------------------- INIT --------------------
(function init(){
  setYear();

  // dropdown toggle
  const dd = document.querySelector('.dd');
  const ddBtn = document.getElementById('servicesBtn');
  if (dd && ddBtn){
    ddBtn.addEventListener('click', (e)=>{
      e.preventDefault();
      dd.classList.toggle('open');
    });
    document.addEventListener('click', (e)=>{
      if (!dd.contains(e.target)) closeDropdown();
    });
    document.addEventListener('keydown', (e)=>{
      if (e.key === 'Escape') closeDropdown();
    });
  }

  // category tabs
  const tabs = [...document.querySelectorAll('.catTab')];
  tabs.forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const key = btn.dataset.theme;
      setTheme(key);
      if (!isPage()){
        applyIndexCopy(key);
      }
      closeDropdown();
    });
  });

  const initial = document.body.dataset.theme || 'tech';
  setTheme(initial);

  if (!isPage()){
    applyIndexCopy(initial);
  }

  // FAQ toggle
  document.querySelectorAll('[data-faq]').forEach(item=>{
    item.addEventListener('click', ()=>{
      item.classList.toggle('open');
    });
  });
})();

// -------------------- INDEX CONTENT --------------------
function applyIndexCopy(key){
  const copy = {
    tech: {
      kicker: 'Ediz Teknoloji',
      headline: 'Akıllı Enerji ve Güvenlik Çözümleri',
      lead: 'Yaşam alanlarını daha güvenli, daha verimli ve daha sürdürülebilir hale getiriyoruz. Akıllı ev otomasyonundan güvenlik sistemlerine, pil paketlemeden güneş paneli kurulumuna kadar uçtan uca kurulum ve destek sunuyoruz.',
      pills: ['Profesyonel Ekip', 'Hızlı & Güvenilir', 'Yerli Üretim', 'Teknik Destek', 'Çevre Dostu'],
      cards: [
        [
          'Akıllı Ev Otomasyon Sistemleri',
          'Aydınlatma, enerji kontrolü ve otomasyon senaryoları ile yaşam alanlarınızı akıllandırıyoruz. Uzaktan kontrol, zamanlama ve sahaya uygun kurulum desteği.',
          'Akıllı Ev'
        ],
        [
          'Güvenlik Sistemleri',
          'IP kamera, kayıt ve uzaktan izleme altyapılarıyla ev ve iş yerleri için güvenlik çözümleri. İhtiyaca uygun sistem planlama, kurulum ve teknik destek.',
          'Güvenlik'
        ],
        [
          'Enerji Sistemleri',
          'Pil paketleme (Li-ion / LiFePO4), BMS entegrasyonu ve enerji depolama çözümleri. Güneş paneli kurulumu ile yenilenebilir enerjiye geçişte proje ve uygulama desteği.',
          'Enerji'
        ],
        [
          'AR-GE Projelerimiz',
          'Yeni nesil jeneratör sistemleri ve insansız kara aracı sistemleri gibi büyük projelerde tasarım, prototipleme ve test süreçlerini yürütüyoruz.',
          'AR-GE'
        ],
      ],
      processTitle: '4 Adımda İlerleyelim',
      process: [
        ['Keşif & İhtiyaç Analizi', 'Alan, hedef ve kapsamı netleştiriyoruz. Uygun çözümü ve planı çıkarıyoruz.'],
        ['Planlama & Tasarım', 'İş planını ve teknik detayları netleştiriyor, onay sonrası uygulamaya geçiyoruz.'],
        ['Kurulum & Devreye Alma', 'Sistemi kuruyor, test ediyor ve devreye alıyoruz. Senaryoları ayarlıyoruz.'],
        ['Destek & Sürdürülebilirlik', 'Satış sonrası teknik destek, bakım ve gerektiğinde geliştirme desteği sağlıyoruz.'],
      ],

      // ✅ GÜNCEL TECH SSS
      faq: [
        ['Fiyatlandırma nasıl belirleniyor?', 'Keşif ve kapsam netleştirildikten sonra; kullanılacak ekipman, işçilik ve saha koşullarına göre teklif hazırlanır.'],
        ['Keşif hizmeti sağlıyor musunuz?', 'Evet. Gerekli durumlarda yerinde keşif yaparak en doğru sistem planlamasını gerçekleştiriyoruz.'],
        ['Kurulum sonrası teknik destek var mı?', 'Evet. Devreye alma, test ve satış sonrası teknik destek sürecini sağlıyoruz.'],
      ]
    },

    design: {
      kicker: 'Ediz Design',
      headline: 'Lazer • CNC • 3D Baskı ile Özel Tasarım Üretim',
      lead:
        'İslami işlemeli tablolar, ışıklı tablolar, duvar aydınlatmaları, MDF oyun setleri ve fason üretim. ' +
        'Fikir → tasarım → üretim → teslim sürecini tek noktadan yönetiyoruz.',
      pills: ['Lazer Kesim', 'CNC Router', '3D Baskı', 'Işıklı Ürünler', 'Fason Üretim'],
      cards: [
        [
          'İslami İşlemeli Tablolar',
          'Kişiye özel ölçü ve tasarımla; MDF/pleksi üzerine işleme. Ev, ofis ve hediye için şık seçenekler.',
          'Tablo'
        ],
        [
          'Oyun Ürünleri (Tavla • Satranç • vb.)',
          'MDF işleme ile her türlü oyun seti: tavla, satranç, özel kutu/kapak tasarımları ve kişiselleştirme.',
          'Oyun'
        ],
        [
          'Duvar Aydınlatmaları • Işıklı Tablolar',
          'LED detaylı duvar dekorları ve ışıklı tablolar. Mekâna göre boyutlandırma ve ambiyans tasarımı.',
          'LED'
        ],
        [
          'Lazer/CNC/3D Baskı Fason Üretim',
          'Toplu veya butik üretim: lazer kesim, CNC router ve 3D baskı. Markanıza özel üretim ve parça çözümü.',
          'Fason'
        ],
      ],
      processTitle: '4 Adımda Üretim Süreci',
      process: [
        ['İhtiyaç & Ölçü', 'Ürün tipi, ölçü, adet ve kullanılacağı alanı netleştiriyoruz. Gerekirse örnek üzerinden ilerliyoruz.'],
        ['Tasarım & Onay', 'Çizim hazırlanır, malzeme ve üretim yöntemi (Lazer/CNC/3D) belirlenir, onay alınır.'],
        ['Üretim', 'Kesim/işleme/baskı süreçleri uygulanır. Detay temizliği ve montaj (varsa) tamamlanır.'],
        ['Teslim & Destek', 'Paketleme ve teslim yapılır. Gerekirse montaj/kurulum yönlendirmesi sağlanır.'],
      ],

      // ✅ GÜNCEL DESIGN SSS
      faq: [
        ['Özel ölçü ve kişiye özel üretim yapıyor musunuz?', 'Evet. Ürünler ölçü, malzeme ve tasarım detaylarına göre özel olarak hazırlanır.'],
        ['Üretim süresi ne kadar?', 'Süre; ürün tipi, adet ve tasarım onayına göre değişir. Onay sonrası planlanan teslim süresini net olarak paylaşırız.'],
        ['Toplu sipariş / fason üretim yapıyor musunuz?', 'Evet. Kurumsal işler ve fason üretim talepleri için nota ve adet bilgisine göre üretim planı oluşturuyoruz.'],
      ]
    },

    // ✅ GÜNCELLENEN LAB KISMI
    lab: {
      kicker: 'EdizLab',
      headline: 'STEM Eğitim Kitleri ile Yaparak Öğrenme',
      lead:
        'Çocukların mühendislik dünyasıyla erken tanışmasını sağlayan; el becerisi, problem çözme ve üretme alışkanlığı kazandıran kitler geliştiriyoruz. Okullar ve atölyeler için anlaşılır yönergeli, modüler setler hazırlıyoruz.',
      pills: ['STEM', 'Motor Beceri', 'ESP32 & IoT', 'MDF Montaj', 'Okul/Atölye'],
      cards: [
        [
          'Akıllı Ev (Smart Home) Kitleri',
          'Sensörler ve senaryolarla çocuklar kendi akıllı ev sistemini kurar. Yaparak öğrenme ile mantık kurma ve üretme alışkanlığı gelişir.',
          'Smart Home'
        ],
        [
          'IoT ve ESP32 Proje Kitleri',
          'ESP32 tabanlı modüllerle bağlantı, sensör okuma ve otomasyon mantığını öğretir. Gerçek proje akışıyla mühendisliğe giriş sağlar.',
          'ESP32'
        ],
        [
          'Yenilenebilir Enerji Eğitim Setleri',
          'Güneş ve rüzgar temalı setlerle enerji dönüşümü, üretim ve ölçüm kavramları deneyle öğrenilir. Sürdürülebilirlik bilinci kazandırır.',
          'Enerji'
        ],
        [
          'MDF STEM Maket & Okul Deney Setleri',
          'MDF montajlı maketler ince motor beceriyi destekler. Okullar için düzenli, dayanıklı ve sınıf kullanımına uygun deney setleri sunar.',
          'Okul'
        ],
      ],
      processTitle: '4 Adımda EdizLab Süreci',
      process: [
        ['Yaş Grubu & Kazanım', 'Hedef yaş aralığını ve kazanımları netleştiriyoruz (motor beceri, temel elektronik, IoT, enerji).'],
        ['İçerik & Kit Tasarımı', 'Malzeme listesi, yönerge ve uygulama akışı hazırlanır. Modüler ve anlaşılır yapı kurulur.'],
        ['Üretim & Paketleme', 'MDF parçalar, elektronik bileşenler ve güvenli paketleme tamamlanır. Sınıf düzenine uygun setlenir.'],
        ['Uygulama & Destek', 'Atölye/okul kullanımına uygun yönlendirme ve içerik desteği sağlarız. Gerekirse geliştirme yapılır.'],
      ],

      // ✅ GÜNCEL LAB SSS
      faq: [
        ['Kitler hangi yaş grupları için uygundur?', 'Kit içerikleri yaş grubuna göre planlanır. Anaokulu, ilkokul, ortaokul ve lise seviyelerine uygun seçenekler sunuyoruz.'],
        ['Kitlerin temel amacı nedir?', 'Amaç; öğrencilerin el becerisi, problem çözme ve temel mühendislik mantığını yaparak öğrenmesini sağlamaktır.'],
        ['Okullar için toplu üretim yapıyor musunuz?', 'Evet. Sınıf sayısına göre setleme, paketleme/etiketleme ve içerik desteğiyle toplu üretim sağlıyoruz.'],
      ]
    }
  };

  const c = copy[key];
  if (!c) return;

  setText('kicker', c.kicker);
  setText('headline', c.headline);
  setText('lead', c.lead);

  // pills
  const pillsEl = document.getElementById('pills');
  if (pillsEl){
    pillsEl.innerHTML = '';
    c.pills.forEach(p=>{
      const s = document.createElement('span');
      s.className = 'pill';
      s.textContent = p;
      pillsEl.appendChild(s);
    });
  }

  // 4 cards
  setText('c1t', c.cards[0][0]); setText('c1d', c.cards[0][1]); setText('c1tag', c.cards[0][2]);
  setText('c2t', c.cards[1][0]); setText('c2d', c.cards[1][1]); setText('c2tag', c.cards[1][2]);
  setText('c3t', c.cards[2][0]); setText('c3d', c.cards[2][1]); setText('c3tag', c.cards[2][2]);
  setText('c4t', c.cards[3][0]); setText('c4d', c.cards[3][1]); setText('c4tag', c.cards[3][2]);

  // process
  if (c.processTitle) setText('processTitle', c.processTitle);
  if (c.process && c.process.length >= 4){
    setText('p1t', c.process[0][0]); setText('p1d', c.process[0][1]);
    setText('p2t', c.process[1][0]); setText('p2d', c.process[1][1]);
    setText('p3t', c.process[2][0]); setText('p3d', c.process[2][1]);
    setText('p4t', c.process[3][0]); setText('p4d', c.process[3][1]);
  }

  // faq
  if (c.faq && c.faq.length >= 3){
    setText('f1q', c.faq[0][0]); setText('f1a', c.faq[0][1]);
    setText('f2q', c.faq[1][0]); setText('f2a', c.faq[1][1]);
    setText('f3q', c.faq[2][0]); setText('f3a', c.faq[2][1]);
  }
}
