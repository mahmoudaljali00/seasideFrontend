import Spinner from "@/components/Spinner";
import useFetchData from "@/hooks/useFetchData";
import Head from "next/head";
import Link from "next/link";

export default function gallery() {
  const { alldata, loading } = useFetchData("/api/photos");
  return (
    <>
      <Head>
        <title>Seaside: Gallery Photos</title>
      </Head>

      <div className="gallerypage">
        <div className="container">
          <div className="gallerytopsec">
            <div className="topphonesec">
              <div className="lefttitlesec">
                <h4>SEASIDE GALLERY PHOTOS</h4>
                <h1>
                  Vaibhav <br /> Photographes
                </h1>
                <Link href="/gallery#galleryimages">
                  <button>VIEW MORE</button>
                </Link>
              </div>
              <div className="rightimgsec">
                <img src="/img/images1.jpeg" alt="" />
                <div className="r_img_top">
                  <img src="/img/images2.jpeg" alt="" />
                  <img src="/img/images3.jpeg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="gallerybtmphotos" id="galleryimages">
          <div className="container">
            <div className="gbtmtitles text-center">
              <h3>
                <span>01//</span> OUR PORTFOLIO
              </h3>
              <h2>
                Seaside captuer <span>All of your</span> <br /> beautiful
                memories
              </h2>
            </div>
            <div className="gallery_image_grid">
              {loading ? (
                <Spinner />
              ) : (
                <>
                  {alldata.map((photo) => {
                    return (
                      <div className="image-item">
                        <img src={photo.images[0]} alt="" />
                        <div className="galleryimgiteminfo">
                          <h2>{photo.title}</h2>
                          <p>By Seaside</p>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
