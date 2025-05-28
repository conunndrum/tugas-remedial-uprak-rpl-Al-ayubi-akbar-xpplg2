const laptops = [
      { name: "Lenovo", price: "Rp 10.000.000", desc: "Laptop gaming tangguh", image: "img/lenovolegion.png", deleted: false },
      { name: "Acer", price: "Rp 6.000.000", desc: "Laptop untuk pekerjaan ringan", image: "img/acer aspire.png", deleted: false },
      { name: "Asus", price: "Rp 8.000.000", desc: "Laptop multimedia", image: "img/laptopasus (2).png", deleted: false },
      { name: "HP", price: "Rp 9.000.000", desc: "Laptop kerja profesional", image: "img/hppavilion (2).png", deleted: false }
    ];

    const laptopList = document.getElementById("laptopList");
    const deletedLaptops = document.getElementById("deletedLaptops");
    const searchInput = document.getElementById("searchInput");

    function displayLaptops() {
      laptopList.innerHTML = "";
      laptops.forEach((laptop, index) => {
        if (!laptop.deleted && laptop.name.toLowerCase().includes(searchInput.value.toLowerCase())) {
          const div = document.createElement("div");
          div.className = "laptop";
          div.innerHTML = `
            <img src="${laptop.image}" alt="${laptop.name}">
            <h3>${laptop.name}</h3>
            <p>${laptop.price}</p>
            <p>${laptop.desc}</p>
            <button onclick="deleteLaptop(${index})">Hapus</button>
          `;
          laptopList.appendChild(div);
        }
      });
    }

    function deleteLaptop(index) {
      laptops[index].deleted = true;
      displayLaptops();
    }

    function showDeleted() {
      deletedLaptops.classList.toggle("hidden");
      deletedLaptops.innerHTML = "";
      laptops.forEach((laptop, index) => {
        if (laptop.deleted) {
          const div = document.createElement("div");
          div.className = "laptop";
          div.innerHTML = `
            <img src="${laptop.image}" alt="${laptop.name}">
            <h3>${laptop.name}</h3>
            <p>${laptop.price}</p>
            <p>${laptop.desc}</p>
            <button onclick="restoreLaptop(${index})">Pulihkan</button>
          `;
          deletedLaptops.appendChild(div);
        }
      });
    }

    function restoreLaptop(index) {
      laptops[index].deleted = false;
      displayLaptops();
      showDeleted();
    }

    function addProduct() {
      const name = document.getElementById("productName").value;
      const price = document.getElementById("productPrice").value;
      const desc = document.getElementById("productDesc").value;
      const image = document.getElementById("preview").src;

      if (name && price && desc && image && image.includes("base64")) {
        laptops.push({ name, price, desc, image, deleted: false });
        displayLaptops();
        document.getElementById("productName").value = "";
        document.getElementById("productPrice").value = "";
        document.getElementById("productDesc").value = "";
        document.getElementById("productImage").value = "";
        document.getElementById("preview").style.display = "none";
      } else {
        alert("Harap isi semua field dan unggah gambar.");
      }
    }

    document.getElementById("productImage").addEventListener("change", function(e) {
      const reader = new FileReader();
      reader.onload = function(event) {
        const preview = document.getElementById("preview");
        preview.src = event.target.result;
        preview.style.display = "block";
      };
      reader.readAsDataURL(e.target.files[0]);
    });

    searchInput.addEventListener("input", displayLaptops);

    displayLaptops();