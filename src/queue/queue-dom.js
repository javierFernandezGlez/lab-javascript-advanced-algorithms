const queueUL = document.querySelector('.list-queue');
const queueInput = document.querySelector('.queue-input');
const warningTopQueue = document.querySelector('#queue-container .warning-top');
const warningBottomQueue = document.querySelector(
  '#queue-container .warning-bottom'
);
const addQueue = document.querySelector('.btn-add-queue');
const dequeue = document.querySelector('.btn-take-dequeue');

const queue = new Queue();

const clearQueueInput = () => {
  queueInput.value = '';
};

const generateListQueue = () => {
  warningTopQueue.style.display = 'none';
  warningBottomQueue.style.display = 'none';
  queueUL.innerHTML = '';
  let length = queue.display().length;
  let size = queue.MAX_SIZE - length;
  queue.display().forEach(item => {
    let li = document.createElement('li');
    li.className = 'active';
    li.innerText = item;
    queueUL.appendChild(li);
  });
  for (let i = 0; i < size; i++) {
    let li = document.createElement('li');
    li.className = 'inactive';
    li.innerHTML = '&nbsp;';
    queueUL.appendChild(li);
  }
};

generateListQueue();

const generateWarningQueue = (type) => {
  if (type === 'QUEUE_UNDERFLOW') {
    warningBottomQueue.style.display = 'block';
    warningBottomQueue.innerText = type;
  } else if (type === 'QUEUE_OVERFLOW') {
    warningTopQueue.style.display = 'block';
    warningTopQueue.innerText = type;
  }
};

const addToQueue = () => {
  try {
    queue.enqueue(queueInput.value);
    generateListQueue();
  } catch (error) {
    generateWarningQueue('QUEUE_OVERFLOW');
  }
};

const removeFromQueue = () => {
  try {
    queue.dequeue();
    generateListQueue();
  } catch (error) {
    generateWarningQueue('QUEUE_UNDERFLOW');
  }
};

addQueue.addEventListener('click', addToQueue);
dequeue.addEventListener('click', removeFromQueue);
