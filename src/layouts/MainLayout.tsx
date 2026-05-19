import { Link, Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-slate-100'>
      <header className='border-b bg-white'>
        <div className='mx-auto flex h-16 max-w-7xl items-center justify-between px-6'>
          <Link
            to='/'
            className='text-2xl font-bold text-blue-600'
          >
            Warehouse Receipt
          </Link>

          <nav className='flex items-center gap-4'>
            <Link
              to='/'
              className='text-sm font-medium text-slate-600 hover:text-blue-600'
            >
              Receipts
            </Link>

            <Link
              to='/create'
              className='rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700'
            >
              Create Receipt
            </Link>
          </nav>
        </div>
      </header>

      <main className='mx-auto max-w-7xl p-6'>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;
