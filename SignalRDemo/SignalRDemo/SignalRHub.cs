using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace SignalRDemo
{
    public interface IClientHub
    {
        Task DisplayMessage(string message);
    }
    public class SignalRHub : Hub<IClientHub>
    {
        public async Task GetData(string user)
        {
            await this.Clients.All.DisplayMessage("Hello " + user);
        }
    }
}
