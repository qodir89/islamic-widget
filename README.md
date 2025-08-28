# islamic-widget
ini adalah widget untuk menampilkan waktu sholat secara dinamis, sudah responsif
menggunakan tailwind css

cara penggunaannya cukup mudah seperti contoh di bawah ini
cukup tambahkan baris ini di lokasi yang kamu mau
<div id="islamic-widget" class="w-full max-w-6xl mx-auto"></div>
<script src="https://cdn.jsdelivr.net/gh/qodir89/islamic-widget/widget.js"></script>


contoh di html

<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Islamic Info Section</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body { font-family: 'Inter', sans-serif; }
    </style>
</head>
<body class="bg-white-100 p-8">
    
    <section class="relative z-30 flex flex-col justify-center items-center w-full -mb-20 -mt-16">
        <div id="islamic-widget" class="w-full max-w-6xl mx-auto"></div>
        <script src="https://cdn.jsdelivr.net/gh/qodir89/islamic-widget/widget.js"></script>
    </section>
</body>
</html>
