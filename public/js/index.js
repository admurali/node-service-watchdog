const socket = io('http://localhost:10010');

socket.on('connect', () => {
  console.log('Connected to server');

//   $('#table').bootstrapTable({
//     columns: [{
//       field: 'pid',
//       title: 'Process #',
//     }, {
//       field: 'cpu',
//       title: 'CPU',
//     }, {
//       field: 'memory',
//       title: 'Memory (MB)',
//     }],
//     data: [],
//   });
});

socket.on('disconnect', () => {
  console.log('Disconnected from server');
});

socket.on('status', (stats) => {
  console.log('Status: ', stats);

  const totalCPU = stats.cpu.total;
  const freeRam = stats.ram.free;
  const totalRam = stats.ram.total;

  const freeRamPercentage = (freeRam * (100.0 / totalRam)).toFixed(0);
  $('#free-ram')[0].className = `circularProgress --${freeRamPercentage}`;
  $('#free-ram-overlay').text(`${freeRamPercentage}% RAM Free`);

  let usedRam = 0;
  let usedCPU = 0;
  stats.cache.map((value) => {
    usedCPU += value.cpu;
    usedRam += value.memory;
    value.memory = (value.memory * (1 / 1000000.0)).toFixed(2);
    if (value.progress) {
      value.progress = `<div class="progress"><div class="progress-bar" style="width:${value.progress.toFixed(0)}%">${value.progress.toFixed(0)}%</div></div>`;
    } else {
      value.progress = '<div class="progress"><div class="progress-bar progress-bar-striped bg-success" role="progressbar" style="width: 100%" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div></div>';
    }
    if (value.type) {
      value.type = '';
    }
    return value.memory;
  });
  let usedCPUPercentage = (usedCPU).toFixed(0);
  if (usedCPUPercentage > 100) {
    usedCPUPercentage = 100;
  }
  $('#used-cpu')[0].className = `circularProgress --${usedCPUPercentage}`;
  $('#used-cpu-overlay').text(`${usedCPUPercentage}% CPU Used`);

  const usedRamPercentage = (usedRam * (100.0 / totalRam)).toFixed(0);
  $('#used-ram')[0].className = `circularProgress --${usedRamPercentage}`;
  $('#used-ram-overlay').text(`${usedRamPercentage}% RAM Used`);

  $('#table').bootstrapTable('load', stats.cache);
});
