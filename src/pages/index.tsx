import * as React from "react";
import * as styles from "./index.module.scss";
import img1 from "../assets/images/test-1.jpg";
import img2 from "../assets/images/test-2.jpg";
import img3 from "../assets/images/test-3.jpg";

import Three from "../components/Three/Three";
import cn from "classnames";
import Layout from "../components/Layout/Layout";
import { StoreProvider } from "../components/StoreProvider/StoreProvider";
const IndexPage = () => {
  // TODO move this to its own Image component
  const onImgLoaded = () => {
    const scrollMain = document.getElementById("scrollArea");
    document.body.style.height = `${
      scrollMain?.getBoundingClientRect().height
    }px`;
  };

  return (
    <StoreProvider>
      <Layout>
        <div>
          <div className={styles.imgContainer}>
            <img
              src={img1}
              alt=""
              className={cn(styles.image, "js-img")}
              id="texture"
              onLoad={() => onImgLoaded()}
            />
            <h2>Shamanic dance</h2>
            <p>
              Leverage agile frameworks to provide a robust synopsis for high
              level overviews. Iterative approaches to corporate strategy foster
              collaborative thinking to further the overall value proposition.
              Organically grow the holistic world view of disruptive innovation
              via workplace diversity and empowerment.
            </p>

            <img
              src={img2}
              alt=""
              className={cn(styles.image, "js-img")}
              id="texture2"
              onLoad={() => onImgLoaded()}
            />
            <h2>Shamanic dance</h2>
            <p>
              Bring to the table win-win survival strategies to ensure proactive
              domination. At the end of the day, going forward, a new normal
              that has evolved from generation X is on the runway heading
              towards a streamlined cloud solution. User generated content in
              real-time will have multiple touchpoints for offshoring.
            </p>
            <img
              src={img3}
              alt=""
              className={cn(styles.image, "js-img")}
              id="texture2"
              onLoad={() => onImgLoaded()}
            />
            <h2>Shamanic dance</h2>
            <p>
              Capitalize on low hanging fruit to identify a ballpark value added
              activity to beta test. Override the digital divide with additional
              clickthroughs from DevOps. Nanotechnology immersion along the
              information highway will close the loop on focusing solely on the
              bottom line.
            </p>
          </div>
        </div>
      </Layout>
      <Three />
    </StoreProvider>
  );
};

export default IndexPage;
