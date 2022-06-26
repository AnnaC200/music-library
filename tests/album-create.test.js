const { expect } = require('chai')
const request = require('supertest')
const getDb = require('../src/services/db')
const app = require('../src/app')

describe('create album', () => {
  let db
  let artist
  beforeEach(async () => {
    db = await getDb()
    await 
      db.query('INSERT INTO Artist (name, genre) VALUES(?, ?)', [
      'Spice Girls',
      'pop'
   ])
  const myArtist = await db.query('SELECT * FROM ARTIST')
  console.log(myArtist)
  // artist=myArtist[0][0]
  }
  
  
  // uses db.query to delete all the artists in the Artist table then closes the connection to the database
  afterEach(async () => {
    await db.query('DELETE FROM Album')
    await db.close()
  })

  describe('/artist/:artistId/album', () => {
    describe('POST', () => {
      it('creates a new album associated to an artist in the database', async () => {
        const res = await request(app).post('/artist/:artistId/album').send({
          // template literal artist/artist.id/album
          name: 'Spice World',
          year: '1997'
        })
        expect(res.status).to.equal(201)
        const [[albumEntries]] = await db.query(
          `SELECT * FROM Album WHERE name = 'Spice Girl'`
        )
        expect(albumEntries.name).to.equal('Spice World')
        expect(albumEntries.year).to.equal('1997')
      })
    })
  })
})
