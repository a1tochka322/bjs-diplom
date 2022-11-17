"use strict"

const logout = new LogoutButton();
logout.action = () => {
  ApiConnector.logout(response => {
    if (response.success) {
      location.reload();
    }
  });
}

ApiConnector.current(response => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  }
});

const rates = new RatesBoard();
function ratesUpd() {
  ApiConnector.getStocks(response => {
    if (response.success) {
      rates.clearTable();
      rates.fillTable(response.data);
    }
  })
}
ratesUpd();
setInterval(ratesUpd, 60000);

const money = new MoneyManager();
money.addMoneyCallback = data => {
  ApiConnector.addMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, 'Счет пополнен успешно!');
    } else {
      money.setMessage(response.success, response.error);
    }

  })
}
money.conversionMoneyCallback = data => {
  ApiConnector.convertMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, 'Счет пополнен успешно!');
    } else {
      money.setMessage(response.success, response.error);
    }

  })
}

money.sendMoneyCallback = data => {
  ApiConnector.transferMoney(data, response => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      money.setMessage(response.success, 'Перевод отправлен успешно!');
    } else {
      money.setMessage(response.success, response.error);
    }

  })
}

const fav = new FavoritesWidget();
ApiConnector.getFavorites(response => {
  if (response.success) {
    fav.clearTable();
    fav.fillTable(response.data);
    money.updateUsersList(response.data);
  }
})

fav.addUserCallback = data => {
  ApiConnector.addUserToFavorites(data, response => {
    if (response.success) {
      fav.clearTable();
      fav.fillTable(response.data);
      money.updateUsersList(response.data);
      fav.setMessage(response.success, 'Пользователь успешно добавлен!');
    } else {
      fav.setMessage(response.success, response.error);
    }
  })
}

fav.removeUserCallback = data => {
  ApiConnector.removeUserFromFavorites(data, response => {
    if (response.success) {
      fav.clearTable();
      fav.fillTable(response.data);
      money.updateUsersList(response.data);
      fav.setMessage(response.success, 'Пользователь успешно добавлен!');
    } else {
      fav.setMessage(response.success, response.error);
    }
  });
}