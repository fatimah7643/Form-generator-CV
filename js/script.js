document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("cvForm");
  const output = document.getElementById("outputPrompt");

  const fotoInput = form.querySelector('input[name="fotoProfil"]');
  const galeriContainer = document.getElementById("galeriLinks");

  form.addEventListener("change", (e) => {
    if (e.target.value === "Foto Profil") {
      fotoInput.classList.toggle("hidden", !e.target.checked);
    }
    if (e.target.value === "Galeri Hasil Project") {
      galeriContainer.classList.toggle("hidden", !e.target.checked);
    }
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const elemen = data.getAll("elemen").join(", ");

    //Konversi Google drive link
    const convertDriveLink = (url) => {
        const match = url?.match(/(?:\/d\/|id=)([a-zA-Z0-9_-]+)/);
        return match ? `https://lh3.googleusercontent.com/d/${match[1]}` : url;
  };

  const fotoProfilLink = convertDriveLink(data.get("fotoProfil"));
    
    const galeriLinks = [...Array(6)].map((_, i) => convertDriveLink(data.get(`galeri${i + 1}`))).filter(Boolean).join(", ");
    
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
- Elemen Tambahan: ${elemen}
${data.get("fotoProfil") ? "- Link Foto Profil: " + fotoProfilLink : ""}
${galeriLinks ? "- Galeri Project: " + galeriLinks : ""}
    `.trim();

    output.value = prompt;
  });

  const copyButton = document.getElementById("copyButton");
  const copyStatus = document.getElementById("copyStatus");

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
        });
    });
});
