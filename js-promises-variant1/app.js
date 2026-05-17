function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function log(message) {
  const logEl = document.getElementById('log');
  if (!logEl) return;
  const time = new Date().toLocaleTimeString();
  logEl.textContent += `[${time}] ${message}\n`;
}

function clearLog() {
  const logEl = document.getElementById('log');
  if (!logEl) return;
  logEl.textContent = '';
}

/**
 * @typedef {Object} Order
 * @property {string} orderId
 * @property {number} amount
 */

function validateOrder(order) {
  if (!order || typeof order !== 'object') throw new Error('Order must be an object');
  if (!order.orderId || typeof order.orderId !== 'string') throw new Error('Invalid orderId');
  if (typeof order.amount !== 'number' || Number.isNaN(order.amount) || order.amount <= 0) {
    throw new Error('Invalid amount');
  }
  return order;
}

function randomFail(stepName) {
  if (Math.random() < 0.2) {
    throw new Error(`${stepName} failed unexpectedly`);
  }
}

function checkAvailability(orderId) {
  return new Promise((resolve, reject) => {
    delay(1000)
      .then(() => {
        log(`Перевірка наявності для ${orderId}...`);
        randomFail('checkAvailability');
        resolve({ orderId, available: true, amount: 350 });
      })
      .catch(reject);
  });
}

function reserveItems(orderId) {
  return new Promise((resolve, reject) => {
    delay(1000)
      .then(() => {
        log(`Резервування товарів для ${orderId}...`);
        randomFail('reserveItems');
        resolve({ orderId, reserved: true });
      })
      .catch(reject);
  });
}

function processPayment(orderId, amount) {
  return new Promise((resolve, reject) => {
    delay(1500)
      .then(() => {
        log(`Обробка оплати для ${orderId} на суму ${amount}...`);
        randomFail('processPayment');
        resolve({ orderId, paid: true, transactionId: `TX-${Date.now()}` });
      })
      .catch(reject);
  });
}

function scheduleDelivery(orderId) {
  return new Promise((resolve, reject) => {
    delay(1000)
      .then(() => {
        log(`Планування доставки для ${orderId}...`);
        randomFail('scheduleDelivery');
        resolve({ orderId, deliveryScheduled: true, eta: 'Tomorrow 18:00' });
      })
      .catch(reject);
  });
}

function processOrder(order) {
  validateOrder(order);
  clearLog();
  log(`Старт обробки замовлення ${order.orderId}`);

  return checkAvailability(order.orderId)
    .then(result => {
      log(`Наявність підтверджено: ${result.orderId}`);
      return reserveItems(result.orderId);
    })
    .then(result => {
      log(`Товари зарезервовано: ${result.orderId}`);
      return processPayment(result.orderId, order.amount);
    })
    .then(result => {
      log(`Оплату успішно оброблено: ${result.transactionId}`);
      return scheduleDelivery(result.orderId);
    })
    .then(result => {
      log(`Доставку заплановано: ${result.eta}`);
      return result;
    })
    .catch(error => {
      log(`ПОМИЛКА: ${error.message}`);
      throw error;
    })
    .finally(() => {
      log('Завершення процесу замовлення');
    });
}

document.addEventListener('DOMContentLoaded', () => {
  const startBtn = document.getElementById('startBtn');
  const sampleBtn = document.getElementById('sampleBtn');
  const orderIdInput = document.getElementById('orderId');
  const amountInput = document.getElementById('amount');

  if (sampleBtn) {
    sampleBtn.addEventListener('click', () => {
      orderIdInput.value = `ORD-${Math.floor(Math.random() * 9000 + 1000)}`;
      amountInput.value = Math.floor(Math.random() * 500 + 100);
      clearLog();
      log('Згенеровано тестове замовлення');
    });
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => {
      const order = {
        orderId: orderIdInput.value.trim(),
        amount: Number(amountInput.value)
      };

      processOrder(order)
        .then(result => {
          log(`ГОТОВО: ${JSON.stringify(result)}`);
        })
        .catch(() => {
          log('Обробка завершена з помилкою');
        });
    });
  }
});

window.validateOrder = validateOrder;
window.checkAvailability = checkAvailability;
window.reserveItems = reserveItems;
window.processPayment = processPayment;
window.scheduleDelivery = scheduleDelivery;
window.processOrder = processOrder;