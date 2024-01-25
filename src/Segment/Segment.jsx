import React, { useEffect, useState } from "react";
import "./Segment.css";
import DropDown from "../Components/DropDown/DropDown";
import axios from "axios";
import { FaAngleLeft } from "react-icons/fa";

const options = [
  { id: 1, Label: "First name", Value: "first_name" },
  { id: 2, Label: "Last name", Value: "last_name" },
  { id: 3, Label: "Gender", Value: "gender" },
  { id: 4, Label: "Age", Value: "age" },
  { id: 5, Label: "Account Name", Value: "account_name" },
  { id: 6, Label: "State", Value: "state" },
];

const Segment = () => {
  const [selectedSchema, setSeletedSchema] = useState("Add schema to segment");
  const [schemas, setSchemas] = useState([]);
  const [segmentData, setSegmentData] = useState({
    segment_name: "",
    schema: [],
  });

  useEffect(() => {
    if (schemas) {
      let finalSchemas = schemas.map((eachSchema) => {
        let option = { [eachSchema.Value]: eachSchema.Label };
        return { ...option };
      });
      setSegmentData({ ...segmentData, schema: finalSchemas });
    }
  }, [schemas]);

  const handleSelectedSchema = (val) => {
    setSeletedSchema(val);
  };

  const handleEdit = (val, id) => {
    let updatedSchemas = schemas.map((eachItem) => {
      if (eachItem.id === id) {
        return val;
      } else {
        return eachItem;
      }
    });

    setSchemas(updatedSchemas);
  };

  const handleAddSchema = () => {
    if (selectedSchema && selectedSchema !== "Add schema to segment") {
      setSchemas((prevVal) => [...prevVal, selectedSchema]);
    }
    setSeletedSchema("Add schema to segment");
  };

  const handleSegmentName = (e) => {
    setSegmentData((prevVal) => ({ ...prevVal, segment_name: e.target.value }));
  };

  let notSeletedItems = [];

  //handle options which are not selected
  for (let item1 of options) {
    let foundInArr2 = false;
    for (let item2 of schemas) {
      if (item1.id === item2.id) {
        foundInArr2 = true;
        break;
      }
    }
    if (!foundInArr2) {
      notSeletedItems.push(item1);
    }
  }

  const hanldeCancel = () => {
    setSeletedSchema("Add schema to segment");
    setSegmentData({ segment_name: "",schema: [],})
    setSchemas([])
    
  };

  const handleDeleteSchema = (id) => {
    setSchemas(schemas.filter((schema) => schema.id !== id));
  };

  //sending data to server
  const handleSendingDataToServer = () => {
    const schemaData = JSON.stringify(segmentData);
    const url = "https://webhook.site/f794b400-4ae4-4dd6-bceb-b1fab391a61f"; // Replace with your actual API URL
  
    if(segmentData.schema.length >= 1){
      axios.post('http://localhost:8080/' + url, schemaData, {
        headers: {
          "Content-Type": "application/json",
        },
        timeout: 5000,
      })
      .then((res) => {
        console.log("sent successfully:", res.data);
        alert('Data has been sent successfully:)')
        setSchemas([])
        setSegmentData({ segment_name: "",schema: [],})
      })
      .catch((err) => {
        console.log("Error:", err);
      });
    }
    else{
      alert('Please add a Schema first!');
    }


  };
  

  return (
    <div className=" segment-container">
      <button
        class="btn save-segment-btn"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasRight"
        aria-controls="offcanvasRight"
      >
        Save segment{" "}
      </button>
      <div
        class="offcanvas offcanvas-end segment-popup-container"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div class="offcanvas-header">
          <div className="segment-popup-header">
            <FaAngleLeft
              type="button"
              className="bi bi-chevron-left"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
              style={{ fontSize: "1.5rem", fontWeight: 700 }}
            />
            <h5 class="offcanvas-title">Saving Segment</h5>
          </div>
        </div>
        <div class="offcanvas-body segment-popup-body-main">
          <div className="segment-popup-body">
            <div>Enter the Name of the Segment</div>
            <input
              className="segment-name-input"
              onChange={handleSegmentName}
              placeholder="Name of the segment"
              required
            />
            <div className="segment-popup-text">To save your segment, you need to add the schemas to build the query</div>
            <div className="segment-legend-container">
              <div className="segment-legend-body">
                <div
                  className="segment-legend-color"
                  style={{ backgroundColor: "#4FBDBA" }}
                ></div>
                <div className="segment-legend-text"> -User Traits</div>
              </div>
              <div className="segment-legend-body">
                <div
                  className="segment-legend-color"
                  style={{ backgroundColor: "#d22020" }}
                ></div>
                <div className="segment-legend-text"> -Group Traits</div>
              </div>
            </div>

            {schemas.length >= 1 && (
              <div className="segment-schemas-list">
                {schemas.map((eachItem) => {
                  return (
                    <DropDown
                      key={eachItem.id}
                      id={eachItem.id}
                      options={notSeletedItems}
                      value={eachItem.Label}
                      handleChange={handleEdit}
                      handleDelete={handleDeleteSchema}
                    />
                  );
                })}
              </div>
            )}
            <DropDown
              options={notSeletedItems}
              value={selectedSchema.Label || selectedSchema}
              handleChange={handleSelectedSchema}
              handleDelete={hanldeCancel}
            />
            <div className="segment-add-body" onClick={handleAddSchema}>
              <a href={() => {}} className="segment-add-link">
                Add new schema
              </a>
            </div>
          </div>
        </div>
        <div className="segment-popup-buttons-container">
          <button
            className="segment-button-save save-btn"
            onClick={handleSendingDataToServer}
          >
            Save the Segment
          </button>
          <button
            onClick={hanldeCancel}
            className="segment-button-cancel cancel-btn"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Segment;
