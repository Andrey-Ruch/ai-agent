import { BsInstagram, BsYoutube, BsFacebook } from "react-icons/bs";
import { Resources } from "@/locales/types";
type props = {
  resources : Resources
}
export default function Footer({resources}: props) {
  return (
    <footer className="mt-32 py-16 bg-gray-100" dir={resources.direction}>
      <div className="container max-w-6xl px-4">
        <div className={"flex flex-col md:flex-row justify-between"}>
          <div className={resources.direction === "ltr"? "mb-8 lg:mb-0 text-left":"mb-8 lg:mb-0 text-right"}>
            <p className="text-lg font-semibold">{resources.home.contactUs}</p>
            <p className="">
            {resources.home.email}{": "}
              <a href={`mailto:${resources.home.emailValue}`} className="text-main">
                {resources.home.emailValue}
              </a>
            </p>
            <p>
              {resources.home.phone}{": "}
              <a href={`tel:+${resources.home.phoneValue}`} className="text-main">
                {resources.home.phoneValue}
              </a>
            </p>
            <p>
              {resources.home.address}{": "}
              <span className="text-main">{resources.home.addressValue}</span>
            </p>

            <div className="my-8 lg:mb-0 flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-main"
                aria-label="Facebook"
              >
                <BsFacebook />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-main"
                aria-label="Instagram"
              >
                <BsInstagram />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-main"
                aria-label="YouTube"
              >
                <BsYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-300 mt-8 pt-4 text-center">
          <div>
            <p>&copy; {new Date().getFullYear()} Agatha <span className="font-thin">version {process.env.VERSION}</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
}
