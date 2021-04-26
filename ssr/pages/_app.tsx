import "../styles/globals.scss";
import { Footer, GoUpButton } from "../shared/components";
import { useRouter } from "next/router";
import { RouterPaths } from "../shared/enums";
import { MovieBoardWrapper } from "../components";
import { wrapper } from "../store";

function MyApp({ Component, pageProps }) {
  const { pathname } = useRouter();

  return (
    <>
      <Component {...pageProps} />
      { pathname !== RouterPaths.ERROR && <MovieBoardWrapper /> }
      <Footer />
      <GoUpButton />
      <div id="portal"></div>
    </>
  );
}

MyApp.getInitialProps = async({Component, ctx}) => {
  return {
      pageProps: {
          ...(Component.getInitialProps ? await Component.getInitialProps({...ctx}) : {}),
          pathname: ctx.pathname,
      },
  };
};

export default wrapper.withRedux(MyApp);
