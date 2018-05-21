const socket = io();

socket.on('connect', () => {
  console.log('Connected to server');

  socket.emit('createSession', {
    to: 'adithya@example.com',
    text: 'Hey. This is Adithya.',
  });


  $('#table').bootstrapTable({
    columns: [{
      field: 'pid',
      title: 'Process #',
    }, {
      field: 'cpu',
      title: 'CPU',
    }, {
      field: 'memory',
      title: 'Memory (MB)',
    }],
    data: [],
  });
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
    return value.memory;
  });
  const usedCPUPercentage = (usedCPU * (100.0 / totalCPU)).toFixed(0);
  $('#used-cpu')[0].className = `circularProgress --${usedCPUPercentage}`;
  $('#used-cpu-overlay').text(`${usedCPUPercentage}% CPU Used`);

  const usedRamPercentage = (usedRam * (100.0 / totalRam)).toFixed(0);
  $('#used-ram')[0].className = `circularProgress --${usedRamPercentage}`;
  $('#used-ram-overlay').text(`${usedRamPercentage}% RAM Used`);

  $('#table').bootstrapTable('load', stats.cache);
});
