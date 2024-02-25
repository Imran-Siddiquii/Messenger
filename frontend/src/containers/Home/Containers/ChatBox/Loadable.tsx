import { Suspense, lazy } from 'react';

const Loadable = lazy(() => import('./index'));

const ChatBox = () => (
  <Suspense fallback={<>loading.....</>}>
    <Loadable />
  </Suspense>
);

export default ChatBox;
