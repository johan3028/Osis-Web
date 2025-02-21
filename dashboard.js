
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('nav button');
    const sections = document.querySelectorAll('.content-section');
  
    buttons.forEach(button => {
      button.addEventListener('click', () => {
        const target = button.getAttribute('data-section');
        sections.forEach(section => {
          section.style.display = section.id === target ? 'block' : 'none';
        });
      });
    });
  
    const absensiChart = new Chart(document.getElementById('absensiChart'), {
      type: 'bar',
      data: {
        labels: ['Ayu', 'Budi', 'Citra'],
        datasets: [{
          label: 'Kehadiran',
          data: [5, 3, 4],
          backgroundColor: ['#6c5ce7', '#74b9ff', '#55efc4']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } }
      }
    });
  
    const keuanganChart = new Chart(document.getElementById('keuanganChart'), {
      type: 'pie',
      data: {
        labels: ['Pemasukan', 'Pengeluaran'],
        datasets: [{
          data: [500000, 200000],
          backgroundColor: ['#00b894', '#d63031']
        }]
      },
      options: {
        responsive: true,
        plugins: { legend: { display: true } }
      }
    });
  });
  