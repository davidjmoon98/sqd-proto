import { useState } from "react";
import { Menu } from "@base-ui/react/menu";
import { Dialog } from "@base-ui/react/dialog";

type Role = "Member" | "Finance" | "Admin" | "Viewer" | null;

interface MatrixCampaign {
  name: string;
  isAdmin: boolean;
}

interface MatrixMember {
  email: string;
  roles: Record<string, Role>;
  pending?: boolean;
  isCurrentUser?: boolean;
}

const allCampaigns: MatrixCampaign[] = [
  { name: "Campaign #1", isAdmin: true },
  { name: "Campaign #3", isAdmin: true },
  { name: "Campaign #5", isAdmin: false },
  { name: "Campaign Name 1", isAdmin: false },
  { name: "Campaign Name 4", isAdmin: true },
];

const adminCampaigns = allCampaigns.filter((c) => c.isAdmin);

const allMembers: MatrixMember[] = [
  {
    email: "davidjmoon@squadance",
    roles: { "Campaign #1": "Admin", "Campaign #3": "Admin", "Campaign #5": "Viewer", "Campaign Name 1": "Member", "Campaign Name 4": "Admin" },
    isCurrentUser: true,
  },
  {
    email: "elvin@squadance",
    roles: { "Campaign #1": "Finance", "Campaign #3": "Finance", "Campaign #5": "Admin", "Campaign Name 1": "Admin", "Campaign Name 4": "Admin" },
  },
  {
    email: "joe@squadance",
    roles: { "Campaign #1": "Admin", "Campaign #3": "Viewer", "Campaign #5": null, "Campaign Name 1": "Admin", "Campaign Name 4": "Admin" },
  },
  {
    email: "pablo@squadance",
    roles: { "Campaign #1": "Admin", "Campaign #3": "Viewer", "Campaign #5": "Member", "Campaign Name 1": "Member", "Campaign Name 4": null },
  },
  {
    email: "jane.doe@squadance",
    roles: { "Campaign #1": "Viewer", "Campaign #3": "Member", "Campaign #5": null, "Campaign Name 1": "Member", "Campaign Name 4": "Viewer" },
  },
  {
    email: "mike.chen@squadance",
    roles: { "Campaign #1": "Member", "Campaign #3": "Admin", "Campaign #5": "Finance", "Campaign Name 1": null, "Campaign Name 4": "Member" },
  },
  {
    email: "lisa.park@squadance",
    roles: { "Campaign #1": "Finance", "Campaign #3": null, "Campaign #5": "Member", "Campaign Name 1": "Viewer", "Campaign Name 4": "Finance" },
  },
  {
    email: "tom.wright@squadance",
    roles: { "Campaign #1": null, "Campaign #3": "Member", "Campaign #5": "Admin", "Campaign Name 1": "Admin", "Campaign Name 4": null },
  },
  {
    email: "anna.garcia@squadance",
    roles: { "Campaign #1": "Viewer", "Campaign #3": "Finance", "Campaign #5": null, "Campaign Name 1": "Member", "Campaign Name 4": "Admin" },
  },
  {
    email: "ryan.taylor@squadance",
    roles: { "Campaign #1": "Member", "Campaign #3": "Member", "Campaign #5": "Viewer", "Campaign Name 1": null, "Campaign Name 4": "Member" },
  },
  {
    email: "emma.johnson@squadance",
    roles: { "Campaign #1": "Admin", "Campaign #3": null, "Campaign #5": "Member", "Campaign Name 1": "Finance", "Campaign Name 4": "Viewer" },
  },
  {
    email: "chris.lee@squadance",
    roles: { "Campaign #1": null, "Campaign #3": "Viewer", "Campaign #5": "Finance", "Campaign Name 1": "Member", "Campaign Name 4": null },
  },
  {
    email: "nina.patel@squadance",
    roles: { "Campaign #1": "Member", "Campaign #3": "Admin", "Campaign #5": null, "Campaign Name 1": "Viewer", "Campaign Name 4": "Finance" },
  },
  {
    email: "derek.huang@squadance",
    roles: { "Campaign #1": null, "Campaign #3": null, "Campaign #5": "Admin", "Campaign Name 1": "Member", "Campaign Name 4": null },
  },
  {
    email: "sofia.martinez@squadance",
    roles: { "Campaign #1": null, "Campaign #3": null, "Campaign #5": "Finance", "Campaign Name 1": "Admin", "Campaign Name 4": null },
  },
  {
    email: "james.kim@squadance",
    roles: { "Campaign #1": null, "Campaign #3": null, "Campaign #5": "Member", "Campaign Name 1": "Finance", "Campaign Name 4": null },
  },
  {
    email: "olivia.nguyen@squadance",
    roles: { "Campaign #1": null, "Campaign #3": null, "Campaign #5": "Viewer", "Campaign Name 1": "Member", "Campaign Name 4": null },
  },
  {
    email: "marcus.reed@squadance",
    roles: { "Campaign #1": null, "Campaign #3": null, "Campaign #5": "Admin", "Campaign Name 1": "Viewer", "Campaign Name 4": null },
  },
  {
    email: "priya.sharma@squadance",
    roles: { "Campaign #1": null, "Campaign #3": null, "Campaign #5": "Member", "Campaign Name 1": "Admin", "Campaign Name 4": null },
  },
  {
    email: "alex.torres@squadance",
    roles: { "Campaign #1": null, "Campaign #3": null, "Campaign #5": "Finance", "Campaign Name 1": "Member", "Campaign Name 4": null },
  },
  {
    email: "hannah.clark@squadance",
    roles: { "Campaign #1": null, "Campaign #3": null, "Campaign #5": "Viewer", "Campaign Name 1": "Finance", "Campaign Name 4": null },
  },
  {
    email: "sarah.wilson@gmail.com",
    roles: { "Campaign #1": "Member", "Campaign #3": null, "Campaign #5": null, "Campaign Name 1": null, "Campaign Name 4": null },
    pending: true,
  },
  {
    email: "kevin.brown@gmail.com",
    roles: { "Campaign #1": null, "Campaign #3": "Member", "Campaign #5": null, "Campaign Name 1": null, "Campaign Name 4": "Viewer" },
    pending: true,
  },
];

const roleOptions: Role[] = ["Member", "Finance", "Admin", "Viewer"];

function RoleDropdown({ role }: { role: Role }) {
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

export default function MatrixView({ crosshair }: { crosshair: boolean }) {
  const [hoverRow, setHoverRow] = useState<number | null>(null);
  const [hoverCol, setHoverCol] = useState<number | null>(null);

  return (
    <div className="bg-white min-h-screen p-8 font-sans">
      {/* Breadcrumb */}
      <p className="text-xs text-black mb-6">Spaces / People</p>

      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-base font-normal text-black">All Campaigns</h1>
        <Dialog.Root>
          <Dialog.Trigger className="px-4 py-1.5 bg-[#1b1b1b] text-white text-xs rounded">
            Add Members
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Backdrop className="fixed inset-0 bg-black/50 z-40" />
            <Dialog.Popup className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl p-6 w-full max-w-sm z-50">
              <Dialog.Title className="text-sm font-normal text-black mb-4">
                Invite a member to campaigns you are an admin of:
              </Dialog.Title>

              <input
                type="email"
                placeholder="Enter Email"
                className="w-full px-4 py-2 bg-gray-100 rounded text-xs placeholder-gray-400 outline-none mb-6"
              />

              <p className="text-xs text-black mb-4">
                Select the Campaigns and their level of access
              </p>

              <div className="space-y-0">
                {adminCampaigns.map((campaign, index) => (
                  <div
                    key={campaign.name}
                    className="flex items-center justify-between py-3 border-b border-gray-100"
                  >
                    <span className="text-xs text-black">{campaign.name}</span>
                    <ModalRoleSelect defaultRole={index === 0 ? "Finance" : "Member"} />
                  </div>
                ))}
              </div>

              <div className="flex justify-end mt-6">
                <Dialog.Close className="px-4 py-1.5 bg-[#1b1b1b] text-white text-xs rounded">
                  Add Member
                </Dialog.Close>
              </div>
            </Dialog.Popup>
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      {/* Matrix Table */}
      <div
        className="border-t border-gray-200 overflow-x-auto"
        onMouseLeave={() => { setHoverRow(null); setHoverCol(null); }}
      >
        {/* Header Row */}
        <div
          className="border-b border-gray-100 items-stretch"
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(180px, 1.5fr) repeat(${allCampaigns.length}, minmax(100px, 1fr))`,
          }}
        >
          <div className="text-xs text-gray-400 py-3 flex items-center">Members</div>
          {allCampaigns.map((campaign, colIdx) => (
            <div
              key={campaign.name}
              className={`text-xs text-black text-center py-3 flex items-center justify-center transition-colors ${crosshair && hoverCol === colIdx ? "bg-gray-50" : ""}`}
            >
              {campaign.name}
            </div>
          ))}
        </div>

        {/* Data Rows */}
        {allMembers.map((member, rowIdx) => (
          <div
            key={rowIdx}
            className="border-b border-gray-100 items-stretch"
            style={{
              display: "grid",
              gridTemplateColumns: `minmax(180px, 1.5fr) repeat(${allCampaigns.length}, minmax(100px, 1fr))`,
            }}
          >
            <div
              className={`text-xs font-mono py-2 flex items-center transition-colors ${member.pending ? "text-gray-400" : "text-black"} ${crosshair && hoverRow === rowIdx ? "bg-gray-50" : ""}`}
              onMouseEnter={() => { setHoverRow(rowIdx); setHoverCol(null); }}
            >
              {member.email}{member.isCurrentUser && <span className="text-gray-400 font-sans ml-1">(you)</span>}
            </div>
            {allCampaigns.map((campaign, colIdx) => (
              <div
                key={campaign.name}
                className={`flex items-center justify-center py-2 transition-colors ${crosshair && (hoverRow === rowIdx || hoverCol === colIdx) ? "bg-gray-50" : ""}`}
                onMouseEnter={() => { setHoverRow(rowIdx); setHoverCol(colIdx); }}
              >
                {member.pending ? (
                  member.roles[campaign.name] && (
                    <span className="text-xs text-gray-400">
                      {member.roles[campaign.name]} (Pending)
                    </span>
                  )
                ) : campaign.isAdmin && !member.isCurrentUser ? (
                  <RoleDropdown role={member.roles[campaign.name]} />
                ) : (
                  <span className={`text-xs ${member.isCurrentUser && member.roles[campaign.name] === "Admin" ? "text-slate-900" : "text-gray-500"}`}>
                    {member.roles[campaign.name] ?? "—"}
                  </span>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
