import dynamic from 'next/dynamic';

const NewFileView = dynamic(
  () => import('@md-cms/ui-react/src/app/views/new-file-view/new-file-view'),
  { ssr: false }
);

const Wrapped = () => <NewFileView />;

export default Wrapped;
