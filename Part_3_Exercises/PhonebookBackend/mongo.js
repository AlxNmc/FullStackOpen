const mongoose = require('mongoose')
const arg_len = process.argv.length

if (arg_len < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]
const url =
    `mongodb+srv://fullstack:${password}@cluster0.uwmob.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Entry = mongoose.model('Entry', entrySchema)

// Print contents of phonebook to console
if (arg_len === 3){
  Entry.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(entry => {
      console.log(`${entry.name} ${entry.number}`)
    })
    mongoose.connection.close()
  })
}
// Add new entry to phonebook
else if (arg_len === 5){

  const entry = new Entry({
    name: process.argv[3],
    number: process.argv[4],
  })

  entry.save().then(result => {
    console.log(`added ${result.name} number ${result.number} to phonebook`)
    mongoose.connection.close()
  })

}
// Invalid arguments (too few or too many)
else {
  console.log('To add entry, provide name and number as arguments: node mongo.js <name> <number>')
  process.exit(1)
}