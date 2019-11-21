using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc.ModelBinding;

namespace ShowsTracker.Extensions
{
    public static class ModelStateDictionaryExtensions
    {
        public static IList<string> GetErrorList(this ModelStateDictionary modelState)
        {
            return (from model in modelState
                    from error in model.Value.Errors
                    select error.ErrorMessage).Distinct().ToList();
        }
    }
}