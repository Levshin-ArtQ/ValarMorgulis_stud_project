
const initialData = async (db) => {
  const { Player, ItemType, Item, Location } = db;
  try {
    // Добавление игроков
    const [nedStark, created] = await Player.findOrCreate({where:{ name: 'Нед Старк'}, defaults: { name: 'Нед Старк', playerclass: 'Knight', email: 'ned@winterfell.com', level: 10, position: 'WF', password: '123456' }});
    const [jaimeLannister, createdlan] = await Player.findOrCreate({where: { name: 'Джейме Ланнистер' }, defaults: { playerclass: 'Knight', email: 'jaime@casterlyrock.com', level: 10, position: 'KL', password: 'simplepassword' }});
    const [melisandre, createdmel] = await Player.findOrCreate({where: { name: 'Мелисандра' }, defaults: { playerclass: 'Wizard', email: 'melisandre@rhllor.com', level: 10, position: 'TW', password: '123456' }});
    const [daenerysTargaryen, createdtar] = await Player.findOrCreate({where: { name: 'Дейенерис Таргариен' }, defaults: { playerclass: 'Paladin', email: 'daenerys@dragonstone.com', level: 10, position: 'VD', password: '123456' }});
    const [tyrionLannister, createdtyr] = await Player.findOrCreate({where: { name: 'Тирион Ланнистер' }, defaults: { playerclass: 'Thief', email: 'tyrion@casterlyrock.com', level: 10, position: 'KL', password: '123456' }});

    // Добавление типов предметов
    const [weapon, createdweapon] = await ItemType.findOrCreate({where: { name: 'Оружие' }, defaults: { name: 'Оружие' }});
    const [armor, createdarmor] = await ItemType.findOrCreate({where: { name: 'Доспехи' }, defaults: { name: 'Доспехи' }});
    const [potions, createdpotions] = await ItemType.findOrCreate({where: { name: 'Зелья' }, defaults: { name: 'Зелья' }});
    const [treasures, createdtreasures] = await ItemType.findOrCreate({where: { name: 'Сокровища' }, defaults: { name: 'Сокровища' }});
    const [books, createdbooks] = await ItemType.findOrCreate({where: { name: 'Книги' }, defaults: { name: 'Книги' }});

    // Добавление предметов
    await Item.findOrCreate({where: {name: 'Меч Неда Старка'}, defaults: { itemType: weapon.id, quality: 100, owner: nedStark.id, name: 'Меч Неда Старка', description: 'Легендарный меч Дома Старков, кованый из валларийской стали.' }});
    await Item.findOrCreate({where: {name: 'Кольчуга Джейме Ланнистера'}, defaults: { itemType: armor.id, quality: 90, owner: jaimeLannister.id, name: 'Кольчуга Джейме Ланнистера', description: 'Изысканная кольчужная броня, принадлежащая Джейме Ланнистеру.' }});
    await Item.findOrCreate({where: {name: 'Зелье Мелисандры'}, defaults: { itemType: potions.id, quality: 80, owner: melisandre.id, name: 'Зелье Мелисандры', description: 'Таинственное зелье, сваренное самой Красной Жрицей.' }});
    await Item.findOrCreate({where: {name: 'Драконье яйцо'}, defaults: { itemType: treasures.id, quality: 100, owner: daenerysTargaryen.id, name: 'Драконье яйцо', description: 'Окаменевшее драконье яйцо, якобы из Теневых Земель за Асшаем.' }});
    await Item.findOrCreate({where: {name: 'Карта Семи Королевств'}, defaults: {itemType: books.id, quality: 70, owner: tyrionLannister.id, name: 'Карта Семи Королевств', description: 'Подробная карта Семи Королевств, неоценимая для стратегического планирования.' }});

    // Добавление локаций
    await Location.findOrCreate({where: {locationId: 'KL'}, defaults: { locationId: 'KL', description: 'Королевская Гавань', locationType: 'City' }});
    await Location.findOrCreate({where: {locationId: 'WF'}, defaults: { locationId: 'WF', description: 'Вест Бенен', locationType: 'City' }});
    await Location.findOrCreate({where: {locationId: 'TW'}, defaults: { locationId: 'TW', description: 'Тирион', locationType: 'City' }});
    await Location.findOrCreate({where: {locationId: 'VD'}, defaults: { locationId: 'VD', description: 'Вест Бенен', locationType: 'City' }});
    await Location.findOrCreate({where: {locationId: 'CL'}, defaults: { locationId: 'CL', description: 'Королевская Гавань', locationType: 'City' }});

    console.log('Initial data has been populated.');
  } catch (error) {
    console.error('Error populating initial data:', error);
  }
};

module.exports = initialData;
