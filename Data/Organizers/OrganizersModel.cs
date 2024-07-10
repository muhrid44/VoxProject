using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Data.Organizers
{
    public class OrganizersModel
    {
        public List<Datum> Data { get; set; }
        public Meta Meta { get; set; }
    }

    public class Datum
    {
        public int Id { get; set; }
        public string OrganizerName { get; set; }
        public string ImageLocation { get; set; }
    }

    public class Action
    {
        public string Previous { get; set; }
        public string Next { get; set; }
    }

    public class Meta
    {
        public Pagination Pagination { get; set; }
    }

    public class Pagination
    {
        public int Total { get; set; }
        public int Count { get; set; }
        public int Per_page { get; set; }
        public int Current_page { get; set; }
        public int Total_page { get; set; }
        public Action Links { get; set; }
    }
}
