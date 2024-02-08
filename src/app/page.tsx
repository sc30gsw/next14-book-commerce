import { Book } from '@/components/Book'
import { tv } from 'tailwind-variants'

// 疑似データ
type Author = {
  id: number
  name: string
  description: string
  profile_icon: `https://${string}/random/${number}`
}

export type TBook = {
  id: number
  title: string
  thumbnail: `/thumbnails/${string}.${'png' | 'jpg' | 'jpeg'}`
  price: number
  author: Author
  content: string
  created_at: string
  updated_at: string
}
const books = [
  {
    id: 1,
    title: 'Book 1',
    thumbnail: '/thumbnails/discord-clone-udemy.png',
    price: 2980,
    author: {
      id: 1,
      name: 'Author 1',
      description: 'Author 1 description',
      profile_icon: 'https://source.unsplash.com/random/2',
    },
    content: 'Content 1',
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 2,
    title: 'Book 2',
    thumbnail: '/thumbnails/notion-udemy.png',
    price: 1980,
    author: {
      id: 2,
      name: 'Author 2',
      description: 'Author 2 description',
      profile_icon: 'https://source.unsplash.com/random/3',
    },
    content: 'Content 2',
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
  {
    id: 3,
    title: 'Book 3',
    price: 4980,
    thumbnail: '/thumbnails/openai-chatapplication-udem.png',
    author: {
      id: 3,
      name: 'Author 3',
      description: 'Author 3 description',
      profile_icon: 'https://source.unsplash.com/random/4',
    },
    content: 'Content 3',
    created_at: new Date().toString(),
    updated_at: new Date().toString(),
  },
] as const satisfies TBook[]

const home = tv(
  {
    slots: {
      base: 'flex flex-wrap justify-center items-center mt-20',
      title: 'text-center w-full font-bold text-3xl mb-2',
    },
    variants: {
      size: {
        md: { base: 'mt-32' },
      },
    },
  },
  { responsiveVariants: ['md'] },
)

const Home = () => {
  const { base, title } = home({ size: { md: 'md' } })

  return (
    <main className={base()}>
      <h2 className={title()}>Book Commerce</h2>
      {books.map((book) => (
        <Book key={book.id} book={book} />
      ))}
    </main>
  )
}
export default Home
