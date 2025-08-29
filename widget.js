(function(){
  const container = document.getElementById("islamic-widget");
  container.innerHTML = `

    <section class="max-w-4xl mx-auto">
        <div class="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-8 shadow-xl">
            <div class="flex items-center justify-between text-white">
                <!-- Jadwal Shalat -->
                <div class="flex-1" >
                    <div class="text-base font-medium opacity-90 mb-2">WAKTU SHALAT</div>
                    <div class="text-3xl font-bold mb-2" id="nextPrayer">Loading</div>
                    <div class="text-xl font-medium mb-1" id="nextPrayerTime">-</div>
                    <div class="text-base opacity-80" id="timeRemaining">-</div>
                </div>

                <!-- Mosque Icon - Visible only on mobile -->
                <div class="block md:hidden ml-6">

                    <svg class="w-40 h-40" viewBox="0 0 100 100" fill="none">
                        <!-- Stars -->
                        <circle cx="15" cy="20" r="1" fill="white" opacity="0.7"/>
                        <circle cx="85" cy="25" r="1" fill="white" opacity="0.7"/>
                        <circle cx="20" cy="35" r="1" fill="white" opacity="0.7"/>
                        
                        <!-- Main dome -->
                        <path d="M30 45 Q30 35 40 35 Q50 30 60 35 Q70 35 70 45 L70 65 L30 65 Z" fill="white" stroke="#374151" stroke-width="2"/>
                        
                        <!-- Side domes -->
                        <path d="M15 50 Q15 45 20 45 Q25 42 30 45 Q35 45 35 50 L35 65 L15 65 Z" fill="white" stroke="#374151" stroke-width="2"/>
                        <path d="M65 50 Q65 45 70 45 Q75 42 80 45 Q85 45 85 50 L85 65 L65 65 Z" fill="white" stroke="#374151" stroke-width="2"/>
                        
                        <!-- Minarets -->
                        <rect x="12" y="25" width="6" height="40" fill="white" stroke="#374151" stroke-width="2"/>
                        <rect x="82" y="25" width="6" height="40" fill="white" stroke="#374151" stroke-width="2"/>
                        
                        <!-- Minaret tops -->
                        <path d="M12 25 Q15 20 18 25" fill="white" stroke="#374151" stroke-width="2"/>
                        <path d="M82 25 Q85 20 88 25" fill="white" stroke="#374151" stroke-width="2"/>
                        
                        <!-- Crescent moons on minarets -->
                        <path d="M14 22
                                A4 4 0 1 1 17 26
                                A3 3 0 1 0 14 22
                                Z" fill="#fbbf24"/>
                        <path d="M84 22
                                A4 4 0 1 1 87 26
                                A3 3 0 1 0 84 22
                                Z" fill="#fbbf24"/>
                        
                        <!-- Main crescent -->
                        <path d="M50 10
                                A5 6 0 1 0 50 29
                                A4.5 3 0 1 1 50 10
                                Z" fill="#fbbf24"/>
                        
                        <!-- Entrance arch -->
                        <path d="M40 50 Q40 45 45 45 Q50 42 55 45 Q60 45 60 50 L60 65 L40 65 Z" fill="#374151"/>
                        
                        <!-- Door -->
                        <rect x="47" y="55" width="6" height="10" fill="#8b5cf6" rx="3"/>
                        
                        <!-- Base -->
                        <rect x="10" y="65" width="80" height="8" fill="white" stroke="#374151" stroke-width="2"/>
                        
                        <!-- Decorative elements -->
                        <circle cx="35" cy="55" r="2" fill="#fbbf24" opacity="0.8"/>
                        <circle cx="65" cy="55" r="2" fill="#fbbf24" opacity="0.8"/>
                    </svg>


                </div>

                <!-- Divider - Hidden on mobile -->
                <div class="hidden md:block w-px h-16 bg-white bg-opacity-30 mx-6"></div>

                <!-- Tanggal - Hidden on mobile -->
                <div class="hidden md:block flex-1">
                    <div class="text-base font-medium opacity-90 mb-2">TANGGAL HARI INI</div>
                    <div class="text-xl font-bold mb-2" id="gregorianDate">-</div>
                    <div class="text-sm mb-1" id="hijriDate">-</div>
                    <div class="text-base opacity-80" id="dayName">-</div>
                </div>

                <!-- Divider - Hidden on mobile -->
                <div class="hidden md:block w-px h-16 bg-white bg-opacity-30 mx-6"></div>

                <!-- Suhu - Hidden on mobile -->
                <div class="hidden md:block flex-1">
                    <div class="text-base font-medium opacity-90 mb-2">SUHU HARI INI</div>
                    <div class="text-3xl font-bold mb-2" id="temperature">-</div>
                    <div class="text-lg font-medium mb-1" id="city">-</div>
                    <div class="text-base opacity-80" id="provinsi">-</div>
                </div>

                <!-- Divider - Hidden on mobile -->
                <div class="hidden md:block w-px h-16 bg-white bg-opacity-30 mx-6"></div>

                <!-- Kondisi Cuaca - Hidden on mobile -->
                <div class="hidden md:block flex-1">
                    <div class="text-base font-medium opacity-90 mb-2">KONDISI CUACA</div>
                    <div class="text-4xl mb-3" id="weatherIcon">-</div>
                    <div class="text-lg font-medium mb-1" id="weatherDesc">-</div>
                    <div class="text-base opacity-80"id="kelembapan">-</div>
                </div>
            </div>
        </div>
    </section>
  `;

  const city = "bekasi"; 
  const bmkgAdm4 = "32.75.01.1001"; 
  const prayerApiUrl = `https://script.google.com/macros/s/AKfycbx02j1Nz0owEHhyq0d3OeOcypVRCRedD5vE5-4J44M7Ovhr9PkJpduQY2U2ez19vu8irw/exec?kota=${city}`;

  // --- Ambil Jadwal Shalat ---
  async function loadPrayer() {
    try {
      const res = await fetch(prayerApiUrl);
      const json = await res.json();
      const data = json.data;
      document.getElementById("gregorianDate").textContent = data.tanggal;
      document.getElementById("dayName").textContent = "Hari " + data.hari;

      const times = data.jadwal;
      const now = new Date();
      const minutesNow = now.getHours()*60 + now.getMinutes();
      const order = ["shubuh","dzuhur","ashr","magrib","isya"];
      let next = null;
      for (const p of order) {
        const [h,m] = times[p].split(":").map(Number);
        if (h*60+m > minutesNow) { next = {name:p, h, m}; break; }
      }
      if (!next) {
        const [h,m] = times.shubuh.split(":").map(Number);
        next = {name:"shubuh", h, m};
      }
      const nameMap = {shubuh:"Subuh", dzuhur:"Dzuhur", ashr:"Ashar", magrib:"Maghrib", isya:"Isya"};
      document.getElementById("nextPrayer").textContent = nameMap[next.name];
      document.getElementById("nextPrayerTime").textContent = `${String(next.h).padStart(2,"0")}:${String(next.m).padStart(2,"0")}`;
      const diff = (next.h*60+next.m) - minutesNow + ((next.h*60+next.m)<=minutesNow?1440:0);
      document.getElementById("timeRemaining").textContent = `Dalam ${Math.floor(diff/60)} jam ${diff%60} menit`;
    } catch(e){ console.error("Gagal ambil jadwal shalat", e); }
  }

  // --- Ambil Tanggal Hijriah dari MyQuran ---
  async function loadHijri() {
    try {
      const today = new Date();
      const d = today.getDate();
      const m = today.getMonth()+1;
      const y = today.getFullYear();
      const res = await fetch(`https://api.myquran.com/v2/cal/hijr?d=${d}&m=${m}&y=${y}`);
      const json = await res.json();
      document.getElementById("hijriDate").textContent = json.data.date[1]; // "17 Dzulhijjah 1445 H"
    } catch(e){ console.error("Gagal ambil tanggal Hijriah", e); }
  }

  // --- Ambil Cuaca dari BMKG ---
  async function loadWeather() {
    try {
      const res = await fetch(`https://api.bmkg.go.id/publik/prakiraan-cuaca?adm4=${bmkgAdm4}`);
      const json = await res.json();
      const lokasi = json.data[0].lokasi;
      const cuaca = json.data[0].cuaca[0][0];
      document.getElementById("city").textContent = lokasi.kotkab;
      document.getElementById("provinsi").textContent = lokasi.provinsi;
      document.getElementById("temperature").textContent = cuaca.t + " °C";
      document.getElementById("weatherDesc").textContent = cuaca.weather_desc;
      document.getElementById("kelembapan").textContent = "Jarak Pandang "+ cuaca.vs_text;
    document.getElementById("weatherIcon").innerHTML = `<img src="${cuaca.image}" width="50"/>`;
    } catch(e){ console.error("Gagal ambil cuaca", e); }
  }

  loadPrayer();
  loadHijri();
  loadWeather();
  setInterval(loadPrayer, 60*1000);
  setInterval(loadWeather, 10*60*1000);
})();




