import { Book } from '@/components/Book'
import { Spinner } from '@/components/Spinner'
import { getAllBooks } from '@/libs/microcms'
import { BookType } from '@/types/Book'
import { MicroCMSListResponse } from 'microcms-js-sdk'
import { Suspense } from 'react'
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
      <Suspense fallback={<Spinner color="indigo" />}>
        {books.map((book) => (
          <Book key={book.id} book={book} />
        ))}
      </Suspense>
    </main>
  )
}
export default Home
