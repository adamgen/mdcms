import dynamic from 'next/dynamic';

const SelectedFileView = dynamic(
  () =>
    import(
      '@md-cms/main-ui/src/app/views/selected-file-view/selected-file-view'
    ),
  { ssr: false }
);
const Wrapped = () => <SelectedFileView />;

export default Wrapped;
