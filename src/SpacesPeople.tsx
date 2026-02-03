import { useState } from "react";
import { Menu } from "@base-ui/react/menu";
import { Dialog } from "@base-ui/react/dialog";

type Role = "Member" | "Finance" | "Admin" | "Viewer" | null;
type Tab = "ownership" | "membership";

interface CampaignMember {
  email: string;
  roles: Record<string, Role>;
  pending?: boolean;
  isCurrentUser?: boolean;
}

interface MembershipCampaign {
  name: string;
  memberCount: number;
  yourRole: Role;
  members: { name: string; email: string; role: string; color: string }[];
}

const campaigns = ["Campaign #1", "Campaign #3", "Campaign #5", "Campaign #7"];

const members: CampaignMember[] = [
  {
    email: "davidjmoon@squadance",
    roles: { "Campaign #1": "Admin", "Campaign #3": "Admin", "Campaign #5": "Admin", "Campaign #7": "Admin" },
    isCurrentUser: true,
  },
  {
    email: "elvin@squadance",
    roles: { "Campaign #1": "Finance", "Campaign #3": "Finance", "Campaign #5": "Admin", "Campaign #7": "Viewer" },
  },
  {
    email: "joe@squadance",
    roles: { "Campaign #1": "Admin", "Campaign #3": "Viewer", "Campaign #5": null, "Campaign #7": "Member" },
  },
  {
    email: "pablo@squadance",
    roles: { "Campaign #1": "Admin", "Campaign #3": "Viewer", "Campaign #5": "Member", "Campaign #7": "Finance" },
  },
  {
    email: "jane.doe@squadance",
    roles: { "Campaign #1": "Viewer", "Campaign #3": "Member", "Campaign #5": null, "Campaign #7": "Viewer" },
  },
  {
    email: "mike.chen@squadance",
    roles: { "Campaign #1": "Member", "Campaign #3": "Admin", "Campaign #5": "Finance", "Campaign #7": "Member" },
  },
  {
    email: "lisa.park@squadance",
    roles: { "Campaign #1": "Finance", "Campaign #3": null, "Campaign #5": "Member", "Campaign #7": "Finance" },
  },
  {
    email: "tom.wright@squadance",
    roles: { "Campaign #1": null, "Campaign #3": "Member", "Campaign #5": "Admin", "Campaign #7": null },
  },
  {
    email: "anna.garcia@squadance",
    roles: { "Campaign #1": "Viewer", "Campaign #3": "Finance", "Campaign #5": null, "Campaign #7": "Admin" },
  },
  {
    email: "ryan.taylor@squadance",
    roles: { "Campaign #1": "Member", "Campaign #3": "Member", "Campaign #5": "Viewer", "Campaign #7": "Member" },
  },
  {
    email: "sarah.wilson@gmail.com",
    roles: { "Campaign #1": "Member", "Campaign #3": null, "Campaign #5": null, "Campaign #7": null },
    pending: true,
  },
  {
    email: "kevin.brown@gmail.com",
    roles: { "Campaign #1": null, "Campaign #3": "Member", "Campaign #5": null, "Campaign #7": "Viewer" },
    pending: true,
  },
];

const membershipCampaigns: MembershipCampaign[] = [
  {
    name: "Campaign Name 1",
    memberCount: 4,
    yourRole: "Member",
    members: [
      { name: "David Moon", email: "davidjmoon@gmail.com", role: "Admin", color: "#1754f9" },
      { name: "Dan Smith", email: "dansmith@gmail.com", role: "Admin", color: "#05bc7c" },
      { name: "Pablo Canales", email: "pablo@gmail.com", role: "Admin", color: "#bab400" },
      { name: "Jane Doe", email: "jane@gmail.com", role: "Member", color: "#f97316" },
    ],
  },
  {
    name: "Campaign Name 2",
    memberCount: 4,
    yourRole: "Member",
    members: [
      { name: "David Moon", email: "davidjmoon@gmail.com", role: "Admin", color: "#1754f9" },
      { name: "Dan Smith", email: "dansmith@gmail.com", role: "Member", color: "#05bc7c" },
      { name: "Pablo Canales", email: "pablo@gmail.com", role: "Member", color: "#bab400" },
      { name: "Jane Doe", email: "jane@gmail.com", role: "Viewer", color: "#f97316" },
    ],
  },
  {
    name: "Campaign Name 3",
    memberCount: 2,
    yourRole: "Finance",
    members: [
      { name: "David Moon", email: "davidjmoon@gmail.com", role: "Admin", color: "#1754f9" },
      { name: "Dan Smith", email: "dansmith@gmail.com", role: "Finance", color: "#05bc7c" },
    ],
  },
  {
    name: "Campaign Name 4",
    memberCount: 3,
    yourRole: "Admin",
    members: [
      { name: "David Moon", email: "davidjmoon@gmail.com", role: "Admin", color: "#1754f9" },
      { name: "Dan Smith", email: "dansmith@gmail.com", role: "Admin", color: "#05bc7c" },
      { name: "Pablo Canales", email: "pablo@gmail.com", role: "Admin", color: "#bab400" },
    ],
  },
];

const roleOptions: Role[] = ["Member", "Finance", "Admin", "Viewer"];

// Campaign list for the modal (user's owned campaigns)
const ownedCampaigns = ["Campaign Name 1", "Campaign Name 2"];

function RoleSelect({ role }: { role: Role }) {
  if (!role) {
    return (
      <Menu.Root>
        <Menu.Trigger className="text-black text-base hover:text-gray-600 hover:bg-gray-200 rounded transition-colors px-2">
          +
        </Menu.Trigger>
        <Menu.Portal>
          <Menu.Positioner className="z-50" sideOffset={4}>
            <Menu.Popup className="bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[100px]">
              {roleOptions.map((option) => (
                <Menu.Item
                  key={option}
                  className="px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </Menu.Item>
              ))}
            </Menu.Popup>
          </Menu.Positioner>
        </Menu.Portal>
      </Menu.Root>
    );
  }

  return (
    <Menu.Root>
      <Menu.Trigger className="flex items-center gap-1 px-2 py-1 text-xs text-slate-900 hover:bg-gray-200 rounded transition-colors">
        <span>{role}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="z-50" sideOffset={4}>
          <Menu.Popup className="bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[100px]">
            {roleOptions.map((option) => (
              <Menu.Item
                key={option}
                className="px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </Menu.Item>
            ))}
            <Menu.Separator className="my-1 border-t border-gray-200" />
            <Menu.Item className="px-3 py-1.5 text-xs text-red-600 hover:bg-red-50 cursor-pointer">
              Revoke access
            </Menu.Item>
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

function ModalRoleSelect({ defaultRole }: { defaultRole: Role }) {
  return (
    <Menu.Root>
      <Menu.Trigger className="flex items-center gap-1 px-2 py-1 text-xs text-slate-900 hover:bg-gray-100 rounded transition-colors">
        <span>{defaultRole}</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="z-50" sideOffset={4}>
          <Menu.Popup className="bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[100px]">
            {roleOptions.map((option) => (
              <Menu.Item
                key={option}
                className="px-3 py-1.5 text-xs text-gray-700 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </Menu.Item>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

function MembersDropdown({ campaign }: { campaign: MembershipCampaign }) {
  return (
    <Menu.Root>
      <Menu.Trigger className="flex items-center gap-1 px-2 py-1 text-xs text-slate-900 hover:bg-gray-100 rounded transition-colors">
        <span>{campaign.memberCount} Members</span>
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </Menu.Trigger>
      <Menu.Portal>
        <Menu.Positioner className="z-50" sideOffset={4}>
          <Menu.Popup className="bg-white rounded-md shadow-lg border border-gray-200 py-1 min-w-[220px]">
            {campaign.members.map((member) => (
              <div
                key={member.email}
                className="flex items-center gap-3 px-3 py-2 border-b border-gray-100 last:border-b-0"
              >
                <div
                  className="w-6 h-6 rounded-sm flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: member.color }}
                >
                  {member.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-black">{member.name}</p>
                  <p className="text-xs text-gray-400 truncate">{member.email}</p>
                </div>
                <span className="text-xs text-gray-400">{member.role}</span>
              </div>
            ))}
          </Menu.Popup>
        </Menu.Positioner>
      </Menu.Portal>
    </Menu.Root>
  );
}

function OwnershipTab({ crosshair }: { crosshair: boolean }) {
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  return (
    <>
      {/* Section Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-base font-normal text-black">Campaigns you own</h1>
        <Dialog.Root>
          <Dialog.Trigger className="px-4 py-1.5 bg-[#1b1b1b] text-white text-xs rounded">
            Add Members
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
            <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-full max-w-sm z-50">
              <Dialog.Title className="text-xs font-normal text-black mb-4">
                Invite a member to this network
              </Dialog.Title>

              {/* Email Input */}
              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 py-2 bg-gray-100 rounded text-xs placeholder-gray-400 outline-none mb-6"
              />

              {/* Campaign Access Section */}
              <p className="text-xs text-black mb-4">
                Select the Campaigns and their level of access
              </p>

              {/* Campaign Rows */}
              <div className="space-y-0">
                {ownedCampaigns.map((campaign, index) => (
                  <div
                    key={campaign}
                    className="flex items-center justify-between py-3 border-b border-gray-100"
                  >
                    <span className="text-xs text-black">{campaign}</span>
                    <ModalRoleSelect defaultRole={index === 0 ? "Finance" : "Member"} />
                  </div>
                ))}
              </div>

              {/* Add Member Button */}
              <div className="flex justify-end mt-6">
                <Dialog.Close className="px-4 py-1.5 bg-[#1b1b1b] text-white text-xs rounded">
                  Add Member
                </Dialog.Close>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Table */}
      <div
        className="border-t border-gray-200"
        onMouseLeave={() => { setHoverRow(null); setHoverCol(null); }}
      >
        {/* Header Row */}
        <div className="grid grid-cols-5 border-b border-gray-100 items-stretch">
          <div className="text-xs text-gray-400 py-3 flex items-center">Members</div>
          {campaigns.map((campaign, colIdx) => (
            <div
              key={campaign}
              className={`text-xs text-black text-center py-3 flex items-center justify-center transition-colors ${crosshair && hoverCol === colIdx ? "bg-gray-50" : ""}`}
            >
              {campaign}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {members.map((member, rowIdx) => (
          <div
            key={rowIdx}
            className="grid grid-cols-5 border-b border-gray-100 items-stretch"
          >
            <div
              className={`text-xs font-mono py-2 flex items-center transition-colors ${member.pending ? "text-gray-400" : "text-black"} ${crosshair && hoverRow === rowIdx ? "bg-gray-50" : ""}`}
              onMouseEnter={() => { setHoverRow(rowIdx); setHoverCol(null); }}
            >
              {member.email}{member.isCurrentUser && <span className="text-gray-400 font-sans ml-1">(you)</span>}
            </div>
            {campaigns.map((campaign, colIdx) => (
              <div
                key={campaign}
                className={`flex items-center justify-center py-2 transition-colors ${crosshair && (hoverRow === rowIdx || hoverCol === colIdx) ? "bg-gray-50" : ""}`}
                onMouseEnter={() => { setHoverRow(rowIdx); setHoverCol(colIdx); }}
              >
                {member.pending ? (
                  member.roles[campaign] && (
                    <span className="text-xs text-gray-400">
                      {member.roles[campaign]} (Pending)
                    </span>
                  )
                ) : member.isCurrentUser ? (
                  <span className="text-xs text-slate-900">{member.roles[campaign]}</span>
                ) : (
                  <RoleSelect role={member.roles[campaign]} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
}

function MembershipTab() {
  return (
    <>
      {/* Section Header */}
      <div className="mb-6">
        <h1 className="text-base font-normal text-black">Campaigns you are apart of</h1>
      </div>

      {/* Table */}
      <div className="border-t border-gray-200">
        {/* Header Row */}
        <div className="grid grid-cols-3 py-3 border-b border-gray-100">
          <div className="text-xs text-gray-400">Campaign</div>
          <div className="text-xs text-gray-400 text-center">Members</div>
          <div className="text-xs text-gray-400 text-center">Your Role</div>
        </div>

        {/* Data Rows */}
        {membershipCampaigns.map((campaign) => (
          <div
            key={campaign.name}
            className="grid grid-cols-3 py-2 border-b border-gray-100 items-center"
          >
            <div className="text-xs text-black">{campaign.name}</div>
            <div className="flex justify-center">
              <MembersDropdown campaign={campaign} />
            </div>
            <div className="text-xs text-black text-center">{campaign.yourRole}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default function SpacesPeople({ crosshair }: { crosshair: boolean }) {
  const [activeTab, setActiveTab] = useState<Tab>("ownership");

  return (
    <div className="bg-white min-h-screen p-8 font-sans">
      {/* Breadcrumb */}
      <p className="text-xs text-black mb-6">Spaces / People</p>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-gray-200 mb-8">
        <button
          onClick={() => setActiveTab("ownership")}
          className={`text-xs pb-2 ${
            activeTab === "ownership"
              ? "text-black border-b-2 border-black"
              : "text-gray-400"
          }`}
        >
          Ownership <span className="text-gray-400 ml-1">2</span>
        </button>
        <button
          onClick={() => setActiveTab("membership")}
          className={`text-xs pb-2 ${
            activeTab === "membership"
              ? "text-black border-b-2 border-black"
              : "text-gray-400"
          }`}
        >
          Membership <span className="ml-1">2</span>
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === "ownership" ? <OwnershipTab crosshair={crosshair} /> : <MembershipTab />}
    </div>
  );
}
