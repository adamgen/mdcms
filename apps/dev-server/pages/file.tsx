import dynamic from 'next/dynamic';

const SelectedFileView = dynamic(
  () =>
    import(
      '../../../libs/main-ui/src/app/views/selected-file-view/selected-file-view'
    ),
  { ssr: false }
);

export default () => <SelectedFileView />;
