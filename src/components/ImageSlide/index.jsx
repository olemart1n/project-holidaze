import styles from "../../styles/components/ImageSlide.module.css";
import { TbSquareRoundedArrowRightFilled, TbSquareRoundedArrowLeftFilled } from "react-icons/tb";
import { GoPrimitiveDot } from "react-icons/go";
import { CiShare1 } from "react-icons/ci";
import { useState } from "react";
function ImageSlide({ data }) {
    let isSafari = false;
    if (navigator.share) {
        isSafari = true;
    }

    const [currentIndex, setCurrentIndex] = useState(0);

    const share = async () => {
        if (navigator.share) {
            await navigator
                .share({ name: data.name, url: window.location.href })
                .catch(() => console.log("share functionality stopped"));
        } else {
            console.log("The native share feature is not implemented");
        }
    };

    const previousImage = () => {
        const isCurrentSlide = currentIndex === 0;
        const newIndex = isCurrentSlide ? data.media.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };
    const nextImage = () => {
        const isCurrentSlide = currentIndex === data.media.length - 1;
        const newIndex = isCurrentSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };
    const goToImage = (i) => {
        setCurrentIndex(i);
    };

    return data.media ? (
        <div className={styles.slide_container}>
            {!isSafari ? "" : <CiShare1 className={styles.share_icon} onClick={share} />}
            <TbSquareRoundedArrowLeftFilled className={styles.left_arrow} onClick={previousImage} />
            <TbSquareRoundedArrowRightFilled className={styles.right_arrow} onClick={nextImage} />
            <img
                className={styles.slide_image}
                src={data.media[currentIndex]}
                alt="image of the venue"
            ></img>
            <div className={styles.image_index_dot_container}>
                {data.media.map((image, imageIndex) => (
                    <GoPrimitiveDot
                        className={
                            currentIndex === imageIndex ? styles.active_dot : styles.index_dot
                        }
                        key={imageIndex}
                        onClick={() => goToImage(imageIndex)}
                    />
                ))}
            </div>
        </div>
    ) : (
        <div>loading</div>
    );
}
export default ImageSlide;
