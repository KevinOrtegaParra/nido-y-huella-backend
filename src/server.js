const app = require('./app');
const {mongoConnet} = require('./databases/config')

const PORT = process.env.PORT || 3000;
mongoConnet()

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});

