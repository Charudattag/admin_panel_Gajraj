import React from "react";

const ContactUs = () => {
  return (
    <div className="container bg-white">
      <form action="">
        {/* Section 1 */}
        <h2 className="section-title mb-4">Section 1: Left Main Page Name</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Enter page name"
          />
        </div>

        {/* Section 2 */}
        <h2 className="section-title mb-4">
          Section 2: Banner and Contact Details
        </h2>
        <div className="mb-3">
          <input type="file" className="form-control" />
          <input
            type="text"
            className="form-control mt-2"
            placeholder="2nd Text Data"
          />
          <input
            type="tel"
            className="form-control mt-2"
            placeholder="Phone Number"
          />
          <input
            type="file"
            className="form-control mt-2"
            placeholder="Right Image"
          />
        </div>

        {/* Section 3 */}
        <h2 className="section-title mb-4">Section 3: Contact Information</h2>
        {[1, 2, 3, 4].map((section) => (
          <div key={section}>
            <textarea
              className="form-control mb-2"
              placeholder={`Left Main Text ${section}`}
            ></textarea>
            <input
              type="text"
              className="form-control mb-2"
              placeholder={`Right Add Name ${section}`}
            />
            <input
              type="email"
              className="form-control mb-2"
              placeholder={`Right Add Name ${section} Email`}
            />
            <textarea
              className="form-control mb-3"
              placeholder="Right Last Text"
            ></textarea>
          </div>
        ))}

        <button className="btn btn-primary mt-3">Add More</button>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary mt-4">
          Update
        </button>
      </form>
    </div>
  );
};

export default ContactUs;
