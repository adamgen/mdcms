import dynamic from 'next/dynamic';

const NewFileView = dynamic(
  () =>
    import(
      '../../../../libs/main-ui/src/app/views/new-file-view/new-file-view'
    ),
  { ssr: false }
);

export default () => <NewFileView />;
