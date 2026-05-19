interface Props {
  title: string;
  description?: string;
  action?: React.ReactNode;
}

const PageHeader = ({
  title,
  description,
  action,
}: Props) => {
  return (
    <div className='mb-6 flex items-center justify-between'>
      <div>
        <h1 className='text-3xl font-bold'>
          {title}
        </h1>

        {description && (
          <p className='mt-1 text-slate-500'>
            {description}
          </p>
        )}
      </div>

      {action}
    </div>
  );
};

export default PageHeader;
