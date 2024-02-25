import { Suspense, lazy } from 'react';

const Loadable = lazy(() => import('./index'));

const ChatList = () => (
  <Suspense fallback={<>loading.....</>}>
    <Loadable />
  </Suspense>
);

export default ChatList;
