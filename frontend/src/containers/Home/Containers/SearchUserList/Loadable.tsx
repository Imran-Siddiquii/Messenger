import { Suspense, lazy } from 'react';

const Loadable = lazy(() => import('./index'));

const SearchUserList = () => (
  <Suspense fallback={<>loading.....</>}>
    <Loadable />
  </Suspense>
);

export default SearchUserList;
