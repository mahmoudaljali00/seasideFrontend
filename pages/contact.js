import axios from "axios";
import Head from "next/head";
import { useState } from "react";
import { FaPhoneVolume, FaTwitter } from "react-icons/fa6";
import { GrLinkedin } from "react-icons/gr";
import { MdAttachEmail } from "react-icons/md";

export default function contact() {
  const [name, setName] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [project, setProject] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");

  const [messageOk, setMessageOk] = useState("");

  async function createProduct(ev) {
    ev.preventDefault();

    setMessageOk("Sending...");

    const data = {
      name,
      lname,
      email,
      company,
      phone,
      country,
      project,
      price,
      description,
    };

    try {
      await axios.post("/api/contacts", data);
      setMessageOk("✅ message sent successfully");

      // reset all form fields after successful
      setName("");
      setLname("");
      setEmail("");
      setCompany("");
      setPhone("");
      setCountry("");
      setProject("");
      setPrice("");
      setDescription("");
    } catch (error) {
      if (error.response) {
        // the req was made and the server responded with a status code
        // the falls out of the range of 2xx
        console.error("server error", error.response.data);
      } else if (error.request) {
        // the req was made but no response was received
        console.error("error", error.request);
      } else {
        // something happened in setting up the req that triggered an error
        console.error("error", error.message);
      }
      setMessageOk("❌ failed o send message");
    }
  }

  const handleProjectChange = (projectName) => {
    if (project.includes(projectName)) {
      setProject(project.filter((project) => project !== projectName));
    } else {
      setProject([...project, projectName]);
    }
  };

  const handlePriceChange = (ev) => {
    setPrice(ev.target.value);
  };

  return (
    <>
      <Head>
        <title>Contact us</title>
      </Head>
      <div className="contactpage">
        <div className="container">
          <div className="contactformp">
            <div className="leftcontp">
              <h2>Get in touch</h2>
              <h2>Let's talk about your project</h2>
              <p>
                Thinking about a new project, a problem to solve, or just want
                to contact? Let's do it!
              </p>
              <p>Use the form on this page or get in touch by other means.</p>
              <p>
                We love questions and feedback - and we're always happy to help!
              </p>
              <div className="leftsociinfo">
                <ul>
                  <li>
                    <FaPhoneVolume />{" "}
                    <span>
                      Phone:{" "}
                      <a href="tel:+249912345678" target="_blank">
                        +249912345678
                      </a>
                    </span>
                  </li>
                  <li>
                    <MdAttachEmail />{" "}
                    <span>
                      Email:{" "}
                      <a href="mailto:info@seaside.com" target="_blank">
                        info@seaside.com
                      </a>
                    </span>
                  </li>
                  <li>
                    <GrLinkedin />{" "}
                    <span>
                      Linkedin:{" "}
                      <a href="tel:+249912345678" target="_blank">
                        Seaside
                      </a>
                    </span>
                  </li>
                  <li>
                    <FaTwitter />{" "}
                    <span>
                      Twitter:{" "}
                      <a href="tel:+249912345678" target="_blank">
                        Seaside
                      </a>
                    </span>
                  </li>
                </ul>
              </div>
            </div>
            <div className="rightcontp">
              <form onSubmit={createProduct}>
                <div className="rightconttitle">
                  <h2>Your Contact information</h2>
                </div>
                <div className="rightcontinputs">
                  <input
                    type="text"
                    value={name}
                    onChange={(ev) => setName(ev.target.value)}
                    placeholder="Frist name"
                    required
                  />
                  <input
                    type="text"
                    value={lname}
                    onChange={(ev) => setLname(ev.target.value)}
                    placeholder="Last name"
                    required
                  />
                  <input
                    type="text"
                    value={email}
                    onChange={(ev) => setEmail(ev.target.value)}
                    placeholder="Email address"
                    required
                  />
                  <input
                    type="text"
                    value={company}
                    onChange={(ev) => setCompany(ev.target.value)}
                    placeholder="Company name"
                    required
                  />
                  <input
                    type="text"
                    value={phone}
                    onChange={(ev) => setPhone(ev.target.value)}
                    placeholder="Phone number"
                    required
                  />
                  <select
                    name="country"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    id="country"
                  >
                    <option>select country</option>
                    <option value="Angola">Angola</option>
                    <option value="Bahrain">Bahrain</option>
                    <option value="Brazil">Brazil</option>
                    <option value="Cameroon">Cameroon</option>
                    <option value="Canada">Canada</option>
                    <option value="Chad">Chad</option>
                    <option value="China">China</option>
                    <option value="Congo">Congo</option>
                    <option value="Egypt">Egypt</option>
                    <option value="France">France</option>
                    <option value="Ghana">Ghana</option>
                    <option value="Iraq">Iraq</option>
                    <option value="Italy">Italy</option>
                    <option value="Japan">Japan</option>
                    <option value="Kenya">Kenya</option>
                    <option value="Kuwait">Kuwait</option>
                    <option value="Lebanon">Lebanon</option>
                    <option value="Libya">Libya</option>
                    <option value="Madagascar">Madagascar</option>
                    <option value="Malawi">Malawi</option>
                    <option value="Mali">Mali</option>
                    <option value="Mauritania">Mauritania</option>
                    <option value="Morocco">Morocco</option>
                    <option value="Oman">Oman</option>
                    <option value="Palestinian">Palestinian</option>
                    <option value="Qatar">Qatar</option>
                    <option value="Rwanda">Rwanda</option>
                    <option value="Saudi Arabia">Saudi Arabia</option>
                    <option value="Senegal">Senegal</option>
                    <option value="Somalia">Somalia</option>
                    <option value="South Africa">South Africa</option>
                    <option value="South Sudan">South Sudan</option>
                    <option value="Spain">Spain</option>
                    <option value="Sudan">Sudan</option>
                    <option value="Sweden">Sweden</option>
                    <option value="Syria">Syria</option>
                    <option value="Tanzania">Tanzania</option>
                    <option value="Türkiye">Türkiye</option>
                    <option value="GBUnited Kingdom">United Kingdom</option>
                    <option value="United States">United States</option>
                  </select>
                </div>
                <div className="rightconttitle">
                  <h2>What services do you need for your project</h2>
                </div>
                <div className="rightcontcheckbox">
                  {[
                    "Website Development",
                    "App Development",
                    "Design System",
                    "Website Migration",
                    "E-commerce Site",
                    "Preformance Evaluation",
                  ].map((projectOption) => (
                    <label
                      key={projectOption}
                      className="cyberpunk-checkbox-label"
                    >
                      <input
                        type="checkbox"
                        className="cyberpunk-checkbox"
                        value={projectOption}
                        checked={project.includes(projectOption)}
                        onChange={() => handleProjectChange(projectOption)}
                      />
                      {projectOption}
                    </label>
                  ))}
                </div>
                <div className="rightconttitle">
                  <h2>
                    How much is the anticipated budget for your next project?
                  </h2>
                </div>
                <div className="rightcontredio">
                  {[
                    "Less than $400",
                    "$400 - $800",
                    "$800 - $1000",
                    "More than $1000",
                  ].map((priceRange) => (
                    <div key={priceRange} className="radio-button">
                      <input
                        type="radio"
                        id={priceRange}
                        name="example-radio"
                        value={priceRange}
                        checked={price === priceRange}
                        onChange={handlePriceChange}
                      />
                      <span className="radio"></span>
                      <label htmlFor={priceRange}>{priceRange}</label>
                    </div>
                  ))}
                </div>
                <div className="rightconttitle">
                  <h2>Tell me about your project</h2>
                </div>
                <div className="rightcontpera">
                  <textarea
                    value={description}
                    onChange={(ev) => setDescription(ev.target.value)}
                    name="description"
                    rows={4}
                    id=""
                    placeholder="Project description"
                  ></textarea>
                </div>
                <hr />
                <div className="rightcontsbtn flex gap-3">
                  <button type="submit">Submit</button>
                  <p>{messageOk}</p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
