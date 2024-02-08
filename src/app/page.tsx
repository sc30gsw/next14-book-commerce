import { Book } from '@/components/Book'
import { getAllBooks } from '@/libs/microcms'
import { BookType } from '@/types/Book'
import { MicroCMSListResponse } from 'microcms-js-sdk'
import { tv } from 'tailwind-variants'

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

const Home = async () => {
  const { base, title } = home({ size: { md: 'md' } })

  const { contents: books } =
    (await getAllBooks()) satisfies MicroCMSListResponse<BookType>

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
