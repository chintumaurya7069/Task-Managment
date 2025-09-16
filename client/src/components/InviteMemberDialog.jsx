import { Dialog } from "primereact/dialog";
import { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

const InviteMemberDialog = ({ visible, onHide }) => {
  const [email, setEmail] = useState("");
  const [members, setMembers] = useState([
    {
      name: "Upashna Gurung",
      email: "uppapeygrg332@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/1.jpg",
      role: "Can edit",
    },
    {
      name: "Jeremy Lee",
      email: "jerrylee1996@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/2.jpg",
      role: "Can edit",
    },
    {
      name: "Thomas Park",
      email: "parktho123@gmail.com",
      avatar: "https://randomuser.me/api/portraits/men/3.jpg",
      role: "Owner",
    },
    {
      name: "Rachel Takahasi",
      email: "takahasirae32@gmail.com",
      avatar: "https://randomuser.me/api/portraits/women/4.jpg",
      role: "Can edit",
    },
  ]);

  const [projectLink] = useState("https://sharelinkhereandthere.com/34565yy29");

  const handleCopy = () => {
    navigator.clipboard.writeText(projectLink);
  };

  const handleSendInvite = () => {
    // TODO: Send invite logic here
    console.log("Send invite to:", email);
    setEmail(""); // clear input
  };

  return (
    <Dialog
      visible={visible}
      onHide={onHide}
      style={{ width: "600px" }}
      modal
      className="bg-white rounded-md"
      header={
        <div className="flex justify-between items-center text-lg font-semibold px-6 pt-6 mb-4">
          <span>
            <span className="text-red-600 underline mr-1">Send an invite</span>
            to a new member
          </span>
          <button onClick={onHide} className="text-black font-normal text-sm">
            Go Back
          </button>
        </div>
      }
      maskClassName="bg-black bg-opacity-50 backdrop-blur-sm"

    >
      <div className="border border-gray-300 p-3 mx-6 pb-4 mb-4">
        {/* Email Input */}
        <div className="flex gap-2 mb-6">
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            onClick={handleSendInvite}
            className="bg-orange-500 text-white px-4 rounded hover:bg-orange-600"
          >
            Send Invite
          </button>
        </div>

        {/* Members List */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3">Members</h3>
          {members.map((member, index) => (
            <div
              key={index}
              className="flex items-center justify-between py-2 border-b border-gray-200"
            >
              <div className="flex items-center gap-3">
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-medium">{member.name}</p>
                  <p className="text-sm text-gray-500">{member.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                {member.role}
                <FiChevronDown />
              </div>
            </div>
          ))}
        </div>

        {/* Project Link */}
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Project Link</h3>
          <div className="flex gap-2">
            <input
              type="text"
              value={projectLink}
              readOnly
              className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-600"
            />
            <button
              onClick={handleCopy}
              className="bg-orange-500 text-white px-4 rounded hover:bg-orange-600 text-sm"
            >
              Copy Link
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default InviteMemberDialog;
