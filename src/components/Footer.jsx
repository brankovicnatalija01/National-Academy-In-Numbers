import { motion } from "framer-motion";
import logo from "./crni_logo.png";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Footer2 = () => {
  return (
    <>
      <footer className="mt-20 border-t border-stroke bg-[#F0F0F4] dark:border-strokedark dark:bg-blacksection border-b-[#b01d1f]">
        <div className="max-w-c-1390 px-4 md:px-8 2xl:px-0 mx-auto">
          {/* Footer Top */}
          <div className="py-6 lg:py-6">
            <div className="flex flex-wrap gap-8 lg:justify-between lg:gap-0">
              <motion.div
                variants={{
                  hidden: {
                    opacity: 0,
                    y: -20,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                  },
                }}
                initial="hidden"
                whileInView="visible"
                transition={{ duration: 1, delay: 0.5 }}
                viewport={{ once: true }}
                className="animate_top w-full lg:w-1/4 mt-6 lg:ml-[120px]"
              >
                <a href="index.html" className="relative">
                  <img
                    width={500}
                    height={500}
                    src={logo}
                    alt="Logo"
                    className="hidden dark:block mx-auto lg:mx-0"
                  />
                </a>
              </motion.div>

              <div className="flex flex-col items-center lg:flex-row w-full justify-end gap-12 md:flex-row lg:w-2/3 xl:w-7/12">
                <div className="flex flex-col items-center gap-8 md:flex-row lg:gap-20">
                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: -20,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="animate_top text-center lg:text-left border-b-4 border-b-[#b01d1f] pb-2"
                  >
                    <h4 className="mb-6 mt-10 text-itemtitle2 font-medium text-black text-lg">
                      Adresa
                    </h4>
                    <ul className="list-none">
                      <li className="mb-4 flex flex-col items-start">
                        <div className="flex items-center hover:text-[#b01d1f] transition-all duration-30 text-lg">
                          <i className="fas fa-home mr-2"></i>
                          <a
                            href="https://maps.google.com/?q=Vojvode Stepe 51, 11010 Beograd"
                            target="_blank"
                            className="hover:text-[#b01d1f]"
                          >
                            Vojvode Stepe 51,
                          </a>
                        </div>
                        <div>
                          <a
                            href="https://maps.google.com/?q=Vojvode Stepe 51, 11010 Beograd"
                            target="_blank"
                            className="hover:text-[#b01d1f] text-lg ml-7"
                          >
                            11010 Beograd
                          </a>
                        </div>
                      </li>
                    </ul>
                  </motion.div>

                  <motion.div
                    variants={{
                      hidden: {
                        opacity: 0,
                        y: -20,
                      },
                      visible: {
                        opacity: 1,
                        y: 0,
                      },
                    }}
                    initial="hidden"
                    whileInView="visible"
                    transition={{ duration: 1, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="animate_top  text-center lg:text-left  pb-2 lg:mr-36 border-b-4 border-b-[#b01d1f]"
                  >
                    <h4 className="mb-6 mt-10 text-itemtitle2 font-medium text-black lg:mr-20 text-lg">
                      Tu smo za vas
                    </h4>
                    <ul className="list-none">
                      <li className="mb-4 flex items-center hover:text-[#b01d1f] transition-all duration-30 text-lg">
                        <i className="fas fa-envelope mr-2"></i>
                        <a
                          href="mailto:tna@napa.gov.rs"
                          className="hover:text-[#b01d1f]"
                        >
                          tna@napa.gov.rs
                        </a>
                      </li>
                      <li className="mb-4 flex items-center hover:text-[#b01d1f] transition-all duration-30 text-lg">
                        <i className="fas fa-envelope mr-2"></i>
                        <a
                          href="mailto:razvoj.programa@napa.gov.rs"
                          className="hover:text-[#b01d1f]"
                        >
                          razvoj.programa@napa.gov.rs
                        </a>
                      </li>
                      <li className="mb-4 flex items-center hover:text-[#b01d1f] transition-all duration-30 text-lg">
                        <i className="fas fa-envelope mr-2  "></i>
                        <a href="mailto:obuke@napa.gov.rs">obuke@napa.gov.rs</a>
                      </li>
                    </ul>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
          {/* Footer Top */}

          {/* Footer Bottom */}
          <div className="flex flex-col flex-wrap items-center justify-center gap-5 border-t border-stroke py-7 dark:border-strokedark lg:flex-row lg:justify-between lg:gap-0">
            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top"
            ></motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top"
            >
              <p>&copy; {new Date().getFullYear()} NAJU</p>
            </motion.div>

            <motion.div
              variants={{
                hidden: {
                  opacity: 0,
                  y: -20,
                },
                visible: {
                  opacity: 1,
                  y: 0,
                },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_top lg:mr-[120px]"
            >
              <ul className="flex items-center gap-5 lg:mr-20">
                <li>
                  <a
                    href="https://www.linkedin.com/company/napasrbija/"
                    aria-label="LinkedIn"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-linkedin fa-2x text-gray-600 hover:text-[#b01d1f] transition-all duration-300"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.facebook.com/napa.srbija/"
                    aria-label="Facebook"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-facebook fa-2x text-gray-600 hover:text-[#b01d1f] transition-all duration-300"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.youtube.com/channel/UCpGRggSbEC7z-js1vKmO4zQ"
                    aria-label="YouTube"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-youtube fa-2x text-gray-600 hover:text-[#b01d1f] transition-all duration-300"></i>
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/napa.srbija/"
                    aria-label="Instagram"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fab fa-instagram fa-2x text-gray-600 hover:text-[#b01d1f] transition-all duration-300"></i>
                  </a>
                </li>
              </ul>
            </motion.div>
          </div>
          {/* Footer Bottom */}
        </div>
      </footer>
    </>
  );
};

export default Footer2;
