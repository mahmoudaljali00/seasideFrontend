import Link from "next/link";
import {
  FaFacebook,
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { GrLinkedinOption } from "react-icons/gr";
import { LiaBasketballBallSolid } from "react-icons/lia";

export default function Footer() {
  return (
    <>
      <footer className="footer">
        <div className="footersec flex flex-center flex-col gap-2">
          <div className="logo">
            <img src="/img/logo-strock.png" alt="" />
          </div>
          <div className="ul flex gap-2">
            <li>
              <Link href="/services">Services</Link>
            </li>
            <li>
              <Link href="/services">Work</Link>
            </li>
            <li>
              <Link href="/services">Skills</Link>
            </li>

            <li>
              <Link href="/services">Contact</Link>
            </li>
          </div>
          <ul className="hero_social">
            <li>
              <a href="/" target="_blank">
                <LiaBasketballBallSolid />
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <FaFacebook />
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <FaInstagram />
              </a>
            </li>
            <li>
              <a href="/" target="_blank">
                <FaYoutube />
              </a>
            </li>
          </ul>
          <div className="copyrights">
            &copy; 2025 All Rights Reserved By <span>ACTMOUD.COM</span>
          </div>
        </div>
      </footer>
    </>
  );
}
