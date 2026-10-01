import AdminContentManager from "../../components/AdminContentManager";

export default function CTCAdmin() {
    return <AdminContentManager kind="ctc" title="CTC / Must Know" description="Manage foundational tools and career resources." categoryLabel="Resource type" categoryOptions={["Tool", "Foundation", "Career", "Other"]} />;
}
