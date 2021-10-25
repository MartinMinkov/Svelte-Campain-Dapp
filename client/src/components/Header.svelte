<div>
	<div class="w-full mt-4 flex flex-row items-center justify-between bg-white shadow-xs">
		<a href="/"><div class="ml-8 text-lg text-gray-700 hidden md:flex">CrowdCoin</div></a>
		<span
			class="w-screen md:w-1/3 h-10 bg-gray-200 cursor-pointer border border-gray-300 text-sm rounded-full flex"
		>
			<input
				type="search"
				name="serch"
				placeholder="Search"
				class="flex-grow px-4 rounded-l-full rounded-r-full text-sm focus:outline-none"
			/>
			<i class="fas fa-search m-3 mr-5 text-lg text-gray-700 w-4 h-4" />
		</span>
		<div class="flex flex-row-reverse mr-4 ml-4 md:hidden">
			<i class="fas fa-bars" />
		</div>
		<div class="flex flex-row-reverse mr-8 md:flex">
			<a href="/campaigns/new">
				<div class="text-gray-700 text-center bg-gray-200 px-4 py-2 m-2 rounded-md cursor-pointer">
					Create Campaign
				</div>
			</a>
			<div class="text-gray-700 text-center bg-gray-200 px-4 py-2 m-2 rounded-md cursor-pointer">
				Campaigns
			</div>
		</div>
	</div>
	<slot />
</div>
