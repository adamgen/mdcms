import dynamic from 'next/dynamic';

const NewFileView = dynamic(
  () => import('@md-cms/main-ui/src/app/views/new-file-view/new-file-view'),
  { ssr: false }
);

const Wrapped = () => <NewFileView />;

export default Wrapped;
