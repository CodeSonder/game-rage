# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
User.create!(username: 'Jorge', email: 'j@esparza.com', password: 'secret')
Review.create!(comment: 'First note!!', user_id: 1 )
Review.create!(comment: 'second note!!', user_id: 1 )
Review.create!(comment: 'third note!!', user_id: 1 )
Review.create!(comment: 'fourth note!!', user_id: 1 )
Review.create!(comment: 'fifth note!!', user_id: 1 )