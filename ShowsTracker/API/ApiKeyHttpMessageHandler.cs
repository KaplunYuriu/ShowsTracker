using System;
using System.Net.Http;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.WebUtilities;

namespace ShowsTracker.API
{
    public class ApiKeyHttpMessageHandler : HttpClientHandler
    {
        private readonly string _apiKey;

        public ApiKeyHttpMessageHandler(string apiKey)
        {
            _apiKey = apiKey;
        }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            var uriBuilder = new UriBuilder(request.RequestUri);
            uriBuilder.Query += $"&apikey={_apiKey}";

            request.RequestUri = uriBuilder.Uri;
            
            return base.SendAsync(request, cancellationToken);
        }
    }
}