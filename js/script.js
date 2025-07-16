document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cvForm");
  const output = document.getElementById("outputPrompt");
  const fotoInput = form.querySelector('input[name="fotoProfil"]');
  const galeriContainer = document.getElementById("galeriLinks");
  const qoutesInput = document.getElementById("qoutesInput");
  const warnaPicker = document.getElementById("warnaPicker");
  const kodeWarna = document.getElementById("kodeWarna");
  const copyStatus = document.getElementById("copyStatus");
  const copyButton = document.getElementById("copyButton");
  const showUIButton = document.getElementById("showUIBtn");
  const uiPreview = document.getElementById("uiPreview");

 
  // Update warna latar belakang saat warna dipilih
  warnaPicker.addEventListener("input", (e) => {
    kodeWarna.textContent = e.target.value;
  });
  

  //Tampilkan/hidden input sesuai pilihan
  form.addEventListener("change", (e) => {
    const { value, checked } = e.target;

    if (value === "Foto Profil") {
      fotoInput.classList.toggle("hidden", !e.target.checked);
    }
    if (e.target.value === "Galeri Hasil Project") {
      galeriContainer.classList.toggle("hidden", !e.target.checked);
    }
    if (e.target.value === "Qoutes dari Pembuat CV") {
      qoutesInput.classList.toggle("hidden", !e.target.checked);
    }
    if (e.target.value === "Warna Latar Belakang Website") {
      warnaPicker.classList.toggle("hidden", !e.target.checked);
      kodeWarna.classList.toggle("hidden", !e.target.checked);
    }

  //submit form
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const elemen = data.getAll("elemen").join(", ");
    const warnaLatar = data.get("warnaLatar")

    //Konversi Google drive link
    const convertDriveLink = (url) => {
        const match = url?.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]+)/);
        return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : url;
  };

  const fotoProfilLink = convertDriveLink(data.get("fotoProfil"));
  const galeriLinks = [...Array(6)].map((_, i) =>
      convertDriveLink(data.get(`galeri${i + 1}`))
    ).filter(Boolean).join(", ");

    const prompt = `
Saya ingin kamu bertindak sebagai seorang frontend developer profesional yang membuat website CV digital.
Website ini harus memiliki desain yang modern, profesional, dan responsif (mobile-first). Gunakan animasi fade-in lembut saat pengguna melakukan scroll, menciptakan pengalaman interaktif yang elegan dan tidak mengganggu fokus.
Setiap elemen penting seperti form input, preview hasil CV, dan tombol aksi akan muncul secara bertahap dengan transisi yang halus untuk memberikan kesan modern dan profesional.

Website mencakup beberapa bagian utama seperti:
- Nama: ${data.get("nama")}
- Tanggal Lahir: ${data.get("tanggalLahir")}
- Posisi yang Dilamar: ${data.get("posisi")}
- Deskripsi Diri: ${data.get("deskripsi")}
- Kontak:
  - Email: ${data.get("email")}
  - Telepon: ${data.get("telepon")}
  - Media Sosial: ${data.get("sosial") || "-"}
- Riwayat Pendidikan: ${data.get("pendidikan")}
- Pengalaman Kerja: ${data.get("pengalaman")}
- Keahlian: ${data.get("keahlian")}
- Sertifikasi: ${data.get("sertifikasi") || "-"}
- Hobi / Minat: ${data.get("hobi") || "-"}
- Gaya Warna CV: ${data.get("gayaCV")}
- Gaya Visual: ${data.get("gayaVisual")}
- Warna Website: ${warnaLatar}
- Qoutes: ${data.get("qoutes") || "-"}
- Elemen Tambahan: ${elemen}
${data.get("fotoProfil") ? "- Link Foto Profil: " + fotoProfilLink : ""}
${galeriLinks ? "- Galeri Project: " + galeriLinks : ""}
Tambahkan tombol "Download CV" di bagian bawah halaman yang saat diklik akan mengunduh versi PDF dari halaman CV yang telah dibuat
    `.trim();

    output.value = prompt;
  });

  // Tampilkan tombol "Lihat UI-nya"
    // Tampilkan tombol "Lihat UI-nya"
    showUIButton.classList.remove("hidden");
  
  // salin teks ke clipboard
copyButton.addEventListener("click", () => {
  const textToCopy = output.value.trim();
  if (!textToCopy) return;

  navigator.clipboard.writeText(textToCopy).then(() => {
    copyStatus.classList.remove("hidden");
    setTimeout(() => {
      copyStatus.classList.add("hidden");
    }, 2000);
  }).catch(err => {
    console.error("Failed to copy text: ", err);
    alert("Gagal menyalin teks. Silakan coba lagi.");
  });
});

//Tombol lihat UI
showUIButton.addEventListener("click", () => {
  uiPreview.classList.toggle("hidden");
  showUIButton.textContent = uiPreview.classList.contains("hidden") 
    ? "Lihat UI-nya" : "Sembunyikan UI";
});

// ...existing code...
});

  }); 

